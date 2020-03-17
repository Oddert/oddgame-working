import React from 'react'

import '../style/index.scss'




const Board = ({ board, loopAll, changeCell }) => {

  function generateRows () {
    const cols = []
    for (let c=0; c<board.length; c++) {
      const rows = []
      for (let r=0; r<board[0].length; r++) {
        rows.push(<div key={r} className={`col ${board[c][r].type}`} onContextMenu={e => {
          e.preventDefault()
          changeCell({ y: c, x: r })
        }}></div>)
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
