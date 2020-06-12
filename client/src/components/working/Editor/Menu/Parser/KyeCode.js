import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editWriteBoard, playBoardWrite } from '../../../../../actions'

import { levels } from '../../../defaultKye.js'

const KyeCode = () => {
  const dispatch = useDispatch()
  const { entity_list, data: { board } } = useSelector(state => state.edit)

  const lazy = 4
  const t = levels[`l_${lazy}`].data

  const mapping = {
    " ": entity_list.floor(),
    "!": entity_list.timer(2),
    "\"": entity_list.timer(1),
    "*": entity_list.diamond(),
    "1": entity_list.wall_round(1),
    "2": entity_list.wall_round(2),
    "3": entity_list.wall_round(3),
    "4": entity_list.wall_round(4),
    "5": entity_list.wall_square(5),
    // "5": entity_list.wall_round(5),
    "6": entity_list.wall_round(6),
    "7": entity_list.wall_round(7),
    "8": entity_list.wall_round(8),
    "9": entity_list.wall_round(9),
    "<": entity_list.marble("left"),
    ">": entity_list.marble("right"),
    "B": entity_list.block_round(),
    "C": entity_list.enemy("cloud"),
    "D": entity_list.sentry("down"),
    "E": entity_list.enemy("teeth"),
    "F": entity_list.shooter("down", "marble"),
    "H": entity_list.blackhole(),
    "K": entity_list.kye(),
    "L": entity_list.sentry("left"),
    "R": entity_list.sentry("right"),
    "S": entity_list.magnet("horizontal"),
    "T": entity_list.enemy("wheel"),
    "U": entity_list.sentry("up"),
    "[": entity_list.enemy("cross"),
    "^": entity_list.marble("up"),
    "a": entity_list.rotate("clock"),
    "b": entity_list.block_square(),
    "c": entity_list.rotate("anticlock"),
    "d": entity_list.slider("down"),
    "e": entity_list.block_soft(),
    "f": entity_list.forcefield("right"),
    "g": entity_list.forcefield("left"),
    "h": entity_list.forcefield("down"),
    "i": entity_list.forcefield("up"),
    "l": entity_list.slider("left"),
    "r": entity_list.slider("right"),
    "s": entity_list.magnet("vertical"),
    "u": entity_list.slider("up"),
    "v": entity_list.marble("down"),
    "w": entity_list.timer(9),
    "x": entity_list.timer(8),
    "y": entity_list.timer(7),
    "z": entity_list.timer(6),
    "{": entity_list.timer(5),
    "|": entity_list.timer(4),
    "}": entity_list.timer(3),
    "~": entity_list.enemy("snake"),
  }

  const convert = str => {
    const out = str.split(/\n/gi).map(row =>
      row.split('').map(each => {
        if (mapping[each]) return mapping[each]
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
      <button onClick={() => dispatch(playBoardWrite(board))}>
        put on real board (crime)
      </button>
    </>
  )
}

export default KyeCode
