import React from 'react'

import handleMove from './handleMove.js'

import Board from './Board/'
import Dev from './Dev'

const generateBoard = () => {
    const out = []
    for (let row = 0; row < 10; row++) {
        const r = []
        for (let col = 0; col < 10; col++) {
            const cell = { type: 'floor', }
            if (row === 0 || row === 9) cell.type = 'wall'
            if (col === 0 || col === 9) cell.type = 'wall'
            r.push(cell)
        }
        out.push(r)
    }

    const getWall = () => {
        const r = Math.floor(Math.random() * 8) + 1
        const c = Math.floor(Math.random() * 8) + 1
        if (out[r][c].type !== 'floor') getWall()
        else out[r][c].type = 'wall'
    }

    for (let i = 0; i < 5; i++) getWall()

    const getBall = () => {
        const ballR = Math.floor(Math.random() * 8) + 1
        const ballC = Math.floor(Math.random() * 8) + 1
        if (out[ballR][ballC].type !== 'floor') return getBall()
        else {
            out[ballR][ballC].type = 'ball'
            out[ballR][ballC].direction = 'right'
        }
    }

    for (let i = 0; i < 3; i++) getBall()

    return out
}


const Marbles = () => {
    const [ board, setBoard, ] = React.useState(generateBoard())

    const [ painter, setPainter, ] = React.useState('wall')

    function handleSelectChange (e) {
        setPainter(e)
    }

    function changeCell ({ y, x, }) {
        const nb = JSON.parse(JSON.stringify(board))
        nb[y][x].type = painter
        nb[y][x].direction = 'right'
        setBoard(nb)
    }

    function loopAll () {
        console.log('-=-=-=-=-=-=-=-=-=-=-=-')
        // console.log(board)
        // Immutable coppies are shallow, nested arrays will still have old references:
        const nv = JSON.parse(JSON.stringify(board))//board.slice().map(row => row.slice().map(c => c))

        const callMarbleLeft = []
        const callMarbleRight = []
        const callMarbleUp = []
        const callMarbleDown = []

        board.forEach((row, r) => {
            row.forEach((col, c) => {
                switch(col.type) {
                    case 'ball':
                        function moveBall () {
                        // console.log('baw found')
                            const moved = handleMove(r, c, col.direction, board)
                            if (moved.y === r && moved.x === c) return
                            // console.log({ r, c  }, moved)
                            if (nv[moved.y] && nv[moved.y][moved.x]) {
                                console.log(`swapping ${r}, ${c} to ${moved.y}, ${moved.x}`)
                                nv[moved.y][moved.x].type = 'ball'
                                nv[moved.y][moved.x].direction = nv[r][c].direction
                                nv[r][c].type = 'floor'
                                delete nv[r][c].direction
                            }
                        }
                        switch(col.direction) {
                            case 'left':
                                callMarbleLeft.push(moveBall)
                                break;
                            case 'right':
                                callMarbleRight.unshift(moveBall)
                                break;
                            case 'up':
                                callMarbleUp.push(moveBall)
                                break;
                            case 'down':
                                callMarbleDown.unshift(moveBall)
                                break;
                            default:
                                console.error(`Invalid item type found at cell ${r}, ${c}`, col)
                        }
                        return
                    default:
                        return
                }
            })
        })

        // Callstack works but marbles need to look 'ahead' of one infront to avoid splitting up incoorrectly
        // In this case the fact that all changes happen simultaniously is actually a detriment
        const callstack = []
            .concat(callMarbleLeft)
            .concat(callMarbleRight)
            .concat(callMarbleUp)
            .concat(callMarbleDown)

        callstack.forEach(e => e())
        // console.log({ board, nv })
        setBoard(nv)
    }
    return (
        <>
            <Board board={board} loopAll={loopAll} changeCell={changeCell} />
            <Dev board={board} setBoard={setBoard} handleSelectChange={handleSelectChange} painter={painter} />
        </>
    )
}

export default Marbles
