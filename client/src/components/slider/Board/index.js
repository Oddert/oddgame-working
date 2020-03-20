import React from 'react'

import '../index.scss'

import slider_left from '../../../resources/slider_left.svg'
import slider_right from '../../../resources/slider_right.svg'
import slider_up from '../../../resources/slider_up.svg'
import slider_down from '../../../resources/slider_down.svg'


const Board = ({ board, loopAll, changeCell }) => {

  const imgs = {
    slider_left,
    slider_right,
    slider_up,
    slider_down
  }

  function generateRows () {
    const cols = []
    for (let c=0; c<board.length; c++) {
      const rows = []
      for (let r=0; r<board[0].length; r++) {
        rows.push(
          <div key={r} className={`col ${board[c][r].type}`} onContextMenu={e => {
            e.preventDefault()
            changeCell({ y: c, x: r })
          }}>
            {
              board[c][r].type === 'slider'
              ? <img className='slider__img' src={imgs[`slider_${board[c][r].direction}`]} alt={`slider ${board[c][r].direction}`} />
              : ''
            }
          </div>
        )
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
