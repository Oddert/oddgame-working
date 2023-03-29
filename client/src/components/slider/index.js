import React from 'react'

import handleMove from './handleMove.js'

import Board from './Board/'
import Dev from './Dev'

const generateBoard = () => {
    const out = []
    for (let row = 0; row < 10; row++) {
        const r = []
        for (let col = 0; col < 10; col++) {
            const cell = { type: 'floor' }
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

    const getslider = () => {
        const sliderR = Math.floor(Math.random() * 8) + 1
        const sliderC = Math.floor(Math.random() * 8) + 1
        if (out[sliderR][sliderC].type !== 'floor') return getslider()
        else {
            out[sliderR][sliderC].type = 'slider'
            out[sliderR][sliderC].direction = 'right'
        }
    }

    for (let i = 0; i < 3; i++) getslider()

    return out
}


const Slider = () => {
    const [ board, setBoard ] = React.useState(generateBoard())
    const [ painter, setPainter ] = React.useState('slider')

    function handleSelectChange (e) {
        setPainter(e)
    }

    function changeCell ({ y, x }) {
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
                    case 'slider':
                        function moveslider () {
                            const moved = handleMove(r, c, col.direction, board)

                            const positionUnMoved = moved.y === r && moved.x === c
                            if (positionUnMoved && moved.direction === col.direction) return
                            // eslint-disable-next-line max-len
                            // console.log(`swapping ${r}, ${c}, ${board[r][c].direction} to ${moved.y}, ${moved.x}, ${moved.direction}`)
                            nv[moved.y][moved.x].type = 'slider'
                            nv[moved.y][moved.x].direction = nv[r][c].direction
                            if (!positionUnMoved) {
                                nv[r][c].type = 'floor'
                                delete nv[r][c].direction
                            }
                        }
                        callstack.push(moveslider)
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

export default Slider
