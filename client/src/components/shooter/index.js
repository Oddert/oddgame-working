import React from 'react'

import Board from './Board/'
// import Dev from './Dev'

import handleShoot from './handleShoot'

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

  const getShooter = (emits) => {
    const sliderR = Math.floor(Math.random()*8) + 1
    const sliderC = Math.floor(Math.random()*8) + 1
    if (out[sliderR][sliderC].type !== 'floor') return getShooter(emits)
    else {
      out[sliderR][sliderC].type = 'shooter'
      out[sliderR][sliderC].direction = 'right'
      out[sliderR][sliderC].emits = emits
    }
  }

  for (let i=0; i<3; i++) getShooter(sliderEmits)

  // console.log({ initBoard: out })
  return out
}


const Slider = () => {
  const [board, setBoard] = React.useState(generateBoard('slider'))
  // const [painter, setPainter] = React.useState('shooter')

  // function handleSelectChange (e) {
  //   setPainter(e)
  // }

  function changeCell ({ y, x }) {
  //   const nb = JSON.parse(JSON.stringify(board))
  //   nb[y][x].type = painter
  //   nb[y][x].direction = 'right'
  //   setBoard(nb)
  }

  function loopAll () {
    // console.log('-=-=-=-=-=-=-=-=-=-=-=-')
    const nv = JSON.parse(JSON.stringify(board))//board.slice().map(row => row.slice().map(c => c))

    const callstack = []

    board.forEach((row, r) => {
      row.forEach((col, c) => {
        switch(col.type) {
          case 'shooter':
            function shootSlider () {
              const { direction, emits } = board[r][c]
              const shoot = handleShoot(r, c, direction,  emits, board)
              console.log(shoot)
              if (!shoot.status) return
              nv[shoot.y][shoot.x] = shoot.data
            }
            callstack.push(shootSlider)
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
      <Board board={board} loopAll={loopAll} changeCell={changeCell} />
      {/* <Dev board={board} setBoard={setBoard} handleSelectChange={handleSelectChange} painter={painter} /> */}
    </>
  )
}

export default Slider
