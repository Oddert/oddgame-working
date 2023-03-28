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

    const getSentry = () => {
        const sentryR = Math.floor(Math.random() * 8) + 1
        const sentryC = Math.floor(Math.random() * 8) + 1
        if (out[sentryR][sentryC].type !== 'floor') return getSentry()
        else {
            out[sentryR][sentryC].type = 'sentry'
            out[sentryR][sentryC].direction = 'right'
        }
    }

    for (let i = 0; i < 3; i++) getSentry()

    return out
}


const Sentry = () => {
    const [ board, setBoard, ] = React.useState(generateBoard())
    const [ painter, setPainter, ] = React.useState('sentry')

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
    // console.log('-=-=-=-=-=-=-=-=-=-=-=-')
        const nv = JSON.parse(JSON.stringify(board))//board.slice().map(row => row.slice().map(c => c))

        const callstack = []

        board.forEach((row, r) => {
            row.forEach((col, c) => {
                switch(col.type) {
                    case 'sentry':
                        function moveSentry () {
                            const moved = handleMove(r, c, col.direction, board)

                            const positionUnMoved = moved.y === r && moved.x === c
                            if (positionUnMoved && moved.direction === col.direction) return
                            // console.log(
                            //     `swapping ${r}, ${c}, ${board[r][c].direction} to ${moved.y}, ${moved.x}, ${moved.direction}`
                            // )
                            nv[moved.y][moved.x].type = 'sentry'
                            nv[moved.y][moved.x].direction = moved.direction
                            if (!positionUnMoved) {
                                nv[r][c].type = 'floor'
                                delete nv[r][c].direction
                            }
                        }
                        callstack.push(moveSentry)
                        return
                    default:
                        return
                }
            })
        })

        callstack.forEach(e => e())

        setBoard(nv)
    }
    return (
        <>
            <Board board={board} loopAll={loopAll} changeCell={changeCell} />
            <Dev board={board} setBoard={setBoard} handleSelectChange={handleSelectChange} painter={painter} />
        </>
    )
}

export default Sentry
