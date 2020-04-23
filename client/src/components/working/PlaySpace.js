import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Board from './Board/'
import Dev from './Dev/'

import { boardWrite } from '../../actions/'

import defaultBoards from './defaultBoards'

import handleShoot from './MoveHandlers/handleShoot'
import handleSliderMove from './MoveHandlers/handleSliderMove'
import handleMarbleMove from './MoveHandlers/handleMarbleMove'
import handleSentryMove from './MoveHandlers/handleSentryMove'
import handleTimer from './MoveHandlers/handleTimer'

import { ranArr, ranNum } from './Utils/randomisers'


const PlaySpace = () => {
  // BUG: This should be in a useEffect???
  // const [board, setBoard] = React.useState(generateBoard('marble'))
  // const [boarda, setBoard] = React.useState(defaultBoards[1].data)
  const [painter, setPainter] = React.useState('marble')

  const dispatch = useDispatch()

  const { board } = useSelector(state => state.play)

  function handleSelectChange (e) {
    setPainter(e)
  }

  function changeCell ({ y, x }) {
    const nb = JSON.parse(JSON.stringify(board))
    nb[y][x].type = painter
    if (painter !== 'timer') nb[y][x].direction = 'right'
    if (painter === 'rotate') nb[y][x].direction = ranArr(['clock', 'anticlock'])
    if (painter === 'timer') nb[y][x].time = ranNum(3, 9)
    if (painter === 'block') nb[y][x].variant = ranArr(['soft', 'square', 'round'])
    if (painter === 'shooter') {
      nb[y][x].direction = ranArr([ 'left', 'right', 'up', 'down' ])
      nb[y][x].emits = ranArr([ 'slider', 'marble' ])
    }
    dispatch(boardWrite(nb))
  }

  function loopAll () {
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
    const nv = JSON.parse(JSON.stringify(board))//board.slice().map(row => row.slice().map(c => c))

    const callstack = []

    board.forEach((row, r) => {
      row.forEach((col, c) => {
        switch(col.type) {
          case 'shooter':
            function shootEntity () {
              const { direction, emits } = col
              const shoot = handleShoot(r, c, nv, direction, emits)
              console.log(shoot)
              if (!shoot.status) return
              nv[shoot.y][shoot.x] = shoot.data
            }
            callstack.push(shootEntity)
            return
          case 'slider':
            function moveslider () {
              const { direction } = col
              const moved = handleSliderMove(r, c, nv, direction)
              // console.log(moved)
              if (moved.toBeRemoved) {
                nv[r][c] = { type: 'floor' }
                return
              }
              const directionUnchanged = !moved.direction || (moved.direction && moved.direction === col.direction)
              const positionUnMoved = moved.y === r && moved.x === c
              if (positionUnMoved) {
                if (!directionUnchanged) nv[r][c].direction = moved.direction
                return
              }
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
          case 'marble':
            function moveMarble () {
              // BUG: well... potential bug, check screenshot, marble @ 4, 6 not moving
              // console.log('baw found')
              const { direction, halted } = col
              const moved = handleMarbleMove(r, c, nv, direction, halted)
              console.log(moved, nv[r][c])
              if (moved.toBeRemoved) {
                nv[r][c] = { type: 'floor' }
                return
              }

              if (moved.halted) nv[r][c].halted = true
              else delete nv[r][c].halted
              // console.log(r, c, moved)
              // console.log(moved.direction && moved.direction !== col.direction)

              if (moved.direction && moved.direction !== col.direction) {
                console.log('direction changed')
                nv[moved.y][moved.x].direction = moved.direction
                return
              }

              if (moved.y === r && moved.x === c) return
              // console.log({ r, c  }, moved)
              if (nv[moved.y] && nv[moved.y][moved.x]) {
                console.log(`swapping ${r}, ${c} to ${moved.y}, ${moved.x}`)
                nv[moved.y][moved.x].type = 'marble'
                nv[moved.y][moved.x].direction = nv[r][c].direction
                nv[r][c].type = 'floor'
                delete nv[r][c].direction
              }
            }
            callstack.push(moveMarble)
            return
          case 'sentry':
            function moveSentry () {
              const { direction } = col
              const moved = handleSentryMove(r, c, nv, direction)
              console.log(moved)
              if (moved.toBeRemoved) {
                nv[r][c] = { type: 'floor' }
                return
              }

              const positionUnMoved = moved.y === r && moved.x === c
              if (positionUnMoved && moved.direction === col.direction) return
              // console.log(`swapping ${r}, ${c}, ${board[r][c].direction} to ${moved.y}, ${moved.x}, ${moved.direction}`)
              nv[moved.y][moved.x].type = 'sentry'
              nv[moved.y][moved.x].direction = moved.direction
              if (!positionUnMoved) {
                nv[r][c].type = 'floor'
                delete nv[r][c].direction
              }
            }
            callstack.push(moveSentry)
            return
          case 'timer':
            function tickTock () {
              const { time } = col
              const ticked = handleTimer(r, c, nv, time)
              if (ticked.toBeRemoved) {
                nv[r][c] = { type: 'floor' }
                return
              }
              nv[r][c].time = ticked.time
            }
            callstack.push(tickTock)
            return
          default:
            return
        }
      })
    })

    callstack.forEach(e => e())

    console.log(board, nv)
    // setBoard(nv)
    dispatch(boardWrite(nv))
  }

  // This file is basically your App.js, rendered as sole child of Provider
  return (
    <div className='Play-Space'>
      <Board
        changeCell={changeCell}
      />
      <Dev
        board={board}
        handleSelectChange={handleSelectChange}
        painter={painter}
        defaultBoards={defaultBoards}
        setBoard={() => console.error('no such function as setboard, a charid')}
        loopAll={loopAll}
      />
    </div>
  )
}

export default PlaySpace
