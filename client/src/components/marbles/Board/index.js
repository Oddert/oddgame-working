import React from 'react'

import handleMove from '../handleMove.js'

import '../style/index.scss'

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
    const r = Math.floor(Math.random()*8) + 1
    const c = Math.floor(Math.random()*8) + 1
    if (out[r][c].type !== 'floor') getWall()
    else out[r][c].type = 'wall'
  }

  for (let i=0; i<5; i++) getWall()

  const getBall = () => {
    const ballR = Math.floor(Math.random()*8) + 1
    const ballC = Math.floor(Math.random()*8) + 1
    if (out[ballR][ballC].type !== 'floor') getBall()
    else out[ballR][ballC].type = 'ball'
  }

  for (let i=0; i<3; i++) getBall()

  return out
}


const Board = () => {
  const [board, setBoard] = React.useState(generateBoard())
  const [direction, setDirection] = React.useState('right')

  // to shut up react warnings:
  if (false) setDirection('right')

  // function moveBall () {
  //
  // }

  function loopAll () {
    console.log('-=-=-=-=-=-=-=-=-=-=-=-')
    // console.log(board)
    // Immutable coppies are shallow, nested arrays will still have old references:
    const nv = JSON.parse(JSON.stringify(board))//board.slice().map(row => row.slice().map(c => c))
    board.forEach((row, r) => {
      row.forEach((col, c) => {
        switch(col.type) {
          case 'ball':
            // console.log('baw found')
            const moved = handleMove(r, c, direction, board)
            if (moved.y === r && moved.x === c) return
            // console.log({ r, c  }, moved)
            if (nv[moved.y] && nv[moved.y][moved.x]) {
              console.log(`swapping ${r}, ${c} to ${moved.y}, ${moved.x}`)
              nv[r][c].type = 'floor'
              nv[moved.y][moved.x].type = 'ball'
            }
            return
          default:
            return
        }
      })
    })
    // console.log({ board, nv })
    setBoard(nv)
  }


  function generateRows () {
    const cols = []
    for (let c=0; c<board.length; c++) {
      const rows = []
      for (let r=0; r<board[0].length; r++) {
        rows.push(<div key={r} className={`col ${board[c][r].type}`}></div>)
      }
      cols.push(<div key={c} className='row'>{rows}</div>)
    }
    return cols
  }

  return (
    <div className='Board' onClick={loopAll}>
      <div>{ generateRows() }</div>
    </div>
  )
}

export default Board
