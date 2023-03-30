import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editWriteBoard, playBoardWrite } from '../../../../../actions'

import { levels } from '../../../defaultKye.js'

const KyeCode = () => {
    const dispatch = useDispatch()
    const { entityList, data: { board } } = useSelector(state => state.edit)

    const lazy = 11
    const t = levels[`l_${lazy}`].data

    const initialPositionShooter = x => {
        console.log({ x })
        const lookupMod = x % 4
        const lookupDict = [
            'right', 'up', 'left', 'down', 
        ]
        return lookupDict[lookupMod]
    }

    const mapping = {
        ' ': () => entityList.floor(),
        '!': () => entityList.timer(2),
        '"': () => entityList.timer(1),
        '*': () => entityList.diamond(),
        '1': () => entityList.wall_round(1),
        '2': () => entityList.wall_round(2),
        '3': () => entityList.wall_round(3),
        '4': () => entityList.wall_round(4),
        '5': () => entityList.wall_square(5),
        // "5": () => entityList.wall_round(5),
        '6': () => entityList.wall_round(6),
        '7': () => entityList.wall_round(7),
        '8': () => entityList.wall_round(8),
        '9': () => entityList.wall_round(9),
        '<': () => entityList.marble('left'),
        '>': () => entityList.marble('right'),
        'B': () => entityList.block_round(),
        'C': () => entityList.enemy('cloud'),
        'D': () => entityList.sentry('down'),
        'E': () => entityList.enemy('teeth'),
        'F': (y, x) => entityList.shooter(initialPositionShooter(x), 'marble'),
        'H': () => entityList.blackhole(),
        'K': () => entityList.kye(),
        'L': () => entityList.sentry('left'),
        'R': () => entityList.sentry('right'),
        'S': () => entityList.magnet('horizontal'),
        'T': () => entityList.enemy('wheel'),
        'U': () => entityList.sentry('up'),
        '[': () => entityList.enemy('cross'),
        '^': () => entityList.marble('up'),
        'a': () => entityList.rotate('clock'),
        'b': () => entityList.block_square(),
        'c': () => entityList.rotate('anticlock'),
        'd': () => entityList.slider('down'),
        'e': () => entityList.block_soft(),
        'f': () => entityList.forcefield('right'),
        'g': () => entityList.forcefield('left'),
        'h': () => entityList.forcefield('down'),
        'i': () => entityList.forcefield('up'),
        'l': () => entityList.slider('left'),
        'r': () => entityList.slider('right'),
        's': () => entityList.magnet('vertical'),
        'u': () => entityList.slider('up'),
        'v': () => entityList.marble('down'),
        'w': () => entityList.timer(9),
        'x': () => entityList.timer(8),
        'y': () => entityList.timer(7),
        'z': () => entityList.timer(6),
        '{': () => entityList.timer(5),
        '|': () => entityList.timer(4),
        '}': () => entityList.timer(3),
        '~': () => entityList.enemy('snake'),
    }

    const convert = str => {
        const out = str.split(/\n/gi).map((row, y) =>
            row.split('').map((each, x) => {
                if (mapping[each]) return mapping[each](y, x)
                else return { type: 'somebs' }
            })
        )
        return out
    }

    const send = () => {
        dispatch(editWriteBoard(convert(t)))
    }

    return (
        <>
            <button onClick={() => convert(t)}>Show me the thing</button>
            <button onClick={send}>
        Print me level: {lazy}, {levels[`l_${lazy}`].title}
            </button>
            <button onClick={() => dispatch(playBoardWrite(board, true, true))}>
        put on real board (crime)
            </button>
        </>
    )
}

export default KyeCode
