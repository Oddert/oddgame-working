import React from 'react'

import Board from './Board/'
import Dev from './Dev/'

import defaultBoards from './defaultBoards'

import handleShoot from './MoveHandlers/handleShoot'
import handleSliderMove from './MoveHandlers/handleSliderMove'
import handleMarbleMove from './MoveHandlers/handleMarbleMove'
import handleSentryMove from './MoveHandlers/handleSentryMove'
import handleTimer from './MoveHandlers/handleTimer'

const ran = arr => arr[Math.floor(Math.random() * arr.length)]
const ranNum = (min = 0, max = 9) => Math.floor(Math.random() * (max + 1 - min)) + min

const generateBoard = (sliderEmits) => {
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
    const r = Math.floor(Math.random()*8) + 1
    const c = Math.floor(Math.random()*8) + 1
    if (out[r][c].type !== 'floor') getWall()
    else out[r][c].type = 'wall'
  }

  for (let i=0; i<5; i++) getWall()

  // const getShooter = emits => {
  //   const sliderR = Math.floor(Math.random()*8) + 1
  //   const sliderC = Math.floor(Math.random()*8) + 1
  //   if (out[sliderR][sliderC].type !== 'floor') return getShooter(emits)
  //   else {
  //     out[sliderR][sliderC].type = 'shooter'
  //     out[sliderR][sliderC].direction = 'right'
  //     out[sliderR][sliderC].emits = emits
  //   }
  // }

  const getRotate = direction => {
    const sliderR = Math.floor(Math.random()*8) + 1
    const sliderC = Math.floor(Math.random()*8) + 1
    if (out[sliderR][sliderC].type !== 'floor') return getRotate(direction)
    else {
      out[sliderR][sliderC].type = 'rotate'
      out[sliderR][sliderC].direction = direction
    }
  }

  // for (let i=0; i<3; i++) getShooter(sliderEmits)
  for (let i=0; i<3; i++) getRotate(ran(['clock', 'anticlock']))

  console.log({ initBoard: out })
  return out
}


const Slider = () => {
  // BUG: This should be in a useEffect???
  // const [board, setBoard] = React.useState(generateBoard('marble'))
  const [board, setBoard] = React.useState(defaultBoards[1].data)
  const [painter, setPainter] = React.useState('marble')

  function handleSelectChange (e) {
    setPainter(e)
  }

  function changeCell ({ y, x }) {
    const nb = JSON.parse(JSON.stringify(board))
    nb[y][x].type = painter
    if (painter !== 'timer') nb[y][x].direction = 'right'
    if (painter === 'rotate') nb[y][x].direction = ran(['clock', 'anticlock'])
    if (painter === 'timer') nb[y][x].time = ranNum(3, 9)
    setBoard(nb)
  }

  function loopAll () {
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
    const nv = JSON.parse(JSON.stringify(board))//board.slice().map(row => row.slice().map(c => c))

    const callstack = []

    board.forEach((row, r) => {
      row.forEach((col, c) => {
        switch(col.type) {
          case 'shooter':
            function shootSlider () {
              const { direction, emits } = board[r][c]
              const shoot = handleShoot(r, c, direction,  emits, nv)
              console.log(shoot)
              if (!shoot.status) return
              nv[shoot.y][shoot.x] = shoot.data
            }
            callstack.push(shootSlider)
            return
          case 'slider':
            function moveslider () {
              const moved = handleSliderMove(r, c, col.direction, nv)
              console.log(moved)
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
              const moved = handleMarbleMove(r, c, col.direction, nv, col.halted)
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
              const moved = handleSentryMove(r, c, col.direction, nv)
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
              const ticked = handleTimer(r, c, nv, col.time)
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
    setBoard(nv)
  }
  return (
    <>
      <Board
        board={board}
        loopAll={loopAll}
        changeCell={changeCell}
      />
      <Dev
        board={board}
        handleSelectChange={handleSelectChange}
        painter={painter}
        defaultBoards={defaultBoards}
        setBoard={setBoard}
      />
    </>
  )
}

export default Slider
