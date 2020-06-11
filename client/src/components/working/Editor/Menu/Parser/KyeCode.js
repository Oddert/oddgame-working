import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editWriteBoard } from '../../../../../actions'

const l_2 = `555555555555555555555555555555
5*>>>>e   e         e       K5
5>>>>>e   5         5        5
5555559   59       75        5
5     5   559     7555 79    5
5     5   5 59   75 55  5    5
5     1   5  56e45  55  5    5
5*     1  5 53^^^15 55  5    5
5e5559  1 553^^^^^1555  5    5
5*vvv 9  153^^^^^^^155  5    5
5vvvvv59  1          5  5    5
5vvvv7559  1        *5s 5    5
5vvv755559  1555555555555    5
5vv45   559   3<<<<<<  *5    5
5eee15   559 b<<<<<<<   5    5
5    15eee559e9<<<<<<  *5   75
5     e^^e     5555555555vv755
5     e^^e              5v45e5
5     e*^e              eeee*5
555555555555555555555555555555`

const l_1 = `555555555555555555555555555555
5T   e       K*  a    d e   E5
5    b 455556        a  b    5
5    b dvvvvd           b    5
5    b dvvvvd          ab    5
5ebbbe eeBBee       c   ebbbe5
5               a            5
5 8rre                a ell8 5
5 5>>e      s  S        e<<5 5
5 5>>B                  B<<5 5
5 5>>B               b  B<<5 5
5 5>>e      S  s     U  e<<5 5
5 2rre               b  ell2 5
5                 bRbb       5
5ebbbe eeeeee  7555559  ebbbe5
5    b u^^^^u  5     5  b    5
5    b u^^^^u  5     5  b    5
5    b 455556  5     5  b    5
5C   e         e  [  e  e   ~5
555555555555555555555555555555`

const l_15 = `755555555555555555555555555559
5c         w<<<<<<<<<<<<<c15*5
5  4555559  w<<<<7a55559<^a5 5
5 v 5eeH 156i75555^e>ev2v^a5 5
5vvv2KBH*v * 5 *v5e8*>e>e^a5 5
5vvv>} ee  } 5veL5^5Cb>ev^a5 5
5ccc59  ^s^^ 5*e 5*5  c>e^a5 5
555555555555559 755555559^43 5
5C  5 H  B*B 13 1  13 *55^   5
5   5 f B B  f  f  >* *55   c5
559 5 HB   B 79 7>*  8*55c 755
555 5 755555553 1555555556 555
555 5 53 *eec5 e*5553c553  3<5
553 5 5  *ee 5Re^5c   53  3<<5
55  5e2 4556 5^* 5  8 5c 2<<<5
53 43   c15a 55555  5 5c*<<<<5
5a    v  c5a 15553 73 2c 8<<<5
59    e  c5a       5a    59<<5
55559cc79c5a     8a55559a559<5
155555555555555555555555555553`

const KyeCode = () => {
  const dispatch = useDispatch()
  const { entity_list } = useSelector(state => state.edit)

  const t = l_15

  const mapping = {
    " ": entity_list.floor(),
    "1": entity_list.wall_round(),
    "2": entity_list.wall_round(),
    "3": entity_list.wall_round(),
    "4": entity_list.wall_round(),
    "6": entity_list.wall_round(),
    "7": entity_list.wall_round(),
    "8": entity_list.wall_round(),
    "9": entity_list.wall_round(),
    "5": entity_list.wall_square(),
    "a": entity_list.rotate("anticlock"),
    "b": entity_list.block_square(),
    "c": entity_list.rotate("clock"),
    "d": entity_list.slider("down"),
    "e": entity_list.block_soft(),
    "l": entity_list.slider("left"),
    "r": entity_list.slider("right"),
    "u": entity_list.slider("up"),
    "s": { type: 'toBeDeCoded', info: 'magnet upright' },
    "B": entity_list.block_round(),
    "C": { type: 'toBeDeCoded', info: 'cloud enemy' },
    "E": { type: 'toBeDeCoded', info: 'teeth enemy' },
    "R": entity_list.sentry("right"),
    "S": { type: 'toBeDeCoded', info: 'magnet on side' },
    "T": { type: 'toBeDeCoded', info: 'cross shape eye enemy' },
    "U": entity_list.sentry("up"),
    "~": { type: 'toBeDeCoded', info: 'snake enemy' },
    "[": { type: 'toBeDeCoded', info: 'crosshair enemy' },
    "*": entity_list.diamond(),
    ">": entity_list.marble("right"),
    "<": entity_list.marble("left"),
    "^": entity_list.marble("up"),
    "v": entity_list.marble("down"),
    "K": { type: 'toBeDeCoded', info: 'Kye' },
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
      <button onClick={send}>Print me the thing</button>
    </>
  )
}

export default KyeCode
