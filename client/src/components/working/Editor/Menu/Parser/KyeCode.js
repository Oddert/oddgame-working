import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editWriteBoard } from '../../../../../actions'

import { levels } from '../../../defaultKye.js'

const KyeCode = () => {
  const dispatch = useDispatch()
  const { entity_list } = useSelector(state => state.edit)

  const lazy = 4
  const t = levels[`l_${lazy}`].data

  const mapping = {
    " ": entity_list.floor(),
    "!": entity_list.timer(2),
    "\"": entity_list.timer(1),
    "*": entity_list.diamond(),
    "1": entity_list.wall_round(),
    "2": entity_list.wall_round(),
    "3": entity_list.wall_round(),
    "4": entity_list.wall_round(),
    "5": entity_list.wall_square(),
    "6": entity_list.wall_round(),
    "7": entity_list.wall_round(),
    "8": entity_list.wall_round(),
    "9": entity_list.wall_round(),
    "<": entity_list.marble("left"),
    ">": entity_list.marble("right"),
    "B": entity_list.block_round(),
    "C": entity_list.enemy("cloud"),
    "D": entity_list.sentry("down"),
    "E": { type: 'toBeDeCoded', info: 'teeth enemy' },
    "F": entity_list.shooter("down", "marble"),
    "H": entity_list.blackhole(),
    "K": { type: 'toBeDeCoded', info: 'Kye' },
    "L": entity_list.sentry("left"),
    "R": entity_list.sentry("right"),
    "S": { type: 'toBeDeCoded', info: 'magnet on side' },
    "T": { type: 'toBeDeCoded', info: 'cross shape eye enemy' },
    "U": entity_list.sentry("up"),
    "[": { type: 'toBeDeCoded', info: 'crosshair enemy' },
    "^": entity_list.marble("up"),
    "a": entity_list.rotate("anticlock"),
    "b": entity_list.block_square(),
    "c": entity_list.rotate("clock"),
    "d": entity_list.slider("down"),
    "e": entity_list.block_soft(),
    "f": { type: 'toBeDeCoded', info: 'forcefield vertical dir1' },
    "g": { type: 'toBeDeCoded', info: 'forcefield vertical dir2' },
    "h": { type: 'toBeDeCoded', info: 'forcefield horizontal dir2' },
    "i": { type: 'toBeDeCoded', info: 'forcefield horizontal dir1' },
    "l": entity_list.slider("left"),
    "r": entity_list.slider("right"),
    "s": { type: 'toBeDeCoded', info: 'magnet upright' },
    "u": entity_list.slider("up"),
    "v": entity_list.marble("down"),
    "w": entity_list.timer(9),
    "x": entity_list.timer(8),
    "y": entity_list.timer(7),
    "z": entity_list.timer(6),
    "{": entity_list.timer(5),
    "|": entity_list.timer(4),
    "}": entity_list.timer(3),
    "~": { type: 'toBeDeCoded', info: 'snake enemy' },
  }

  const convertOne = each => {
    if (mapping[each]) return mapping[each]
    else return { type: 'somebs' }
  }

  const convert = str => {
    console.log(str.split(/\n/gi))
    const out = str.split(/\n/gi).map(row =>
      row.split('').map(convertOne)
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
    </>
  )
}

export default KyeCode
