import React from 'react'

import Shooter from '../Entities/Shooter'
import Slider from '../Entities/Slider'
import Marble from '../Entities/Marble'

import '../index.scss'

import shooter_slider_left from '../../../resources/shooter_slider_left.svg'
import shooter_slider_right from '../../../resources/shooter_slider_right.svg'
import shooter_slider_up from '../../../resources/shooter_slider_up.svg'
import shooter_slider_down from '../../../resources/shooter_slider_down.svg'

import shooter_marble_left from '../../../resources/shooter_marble_left.svg'
import shooter_marble_right from '../../../resources/shooter_marble_right.svg'
import shooter_marble_up from '../../../resources/shooter_marble_up.svg'
import shooter_marble_down from '../../../resources/shooter_marble_down.svg'

import slider_left from '../../../resources/slider_left.svg'
import slider_right from '../../../resources/slider_right.svg'
import slider_up from '../../../resources/slider_up.svg'
import slider_down from '../../../resources/slider_down.svg'

import marble_left from '../../../resources/marble_left.svg'
import marble_right from '../../../resources/marble_right.svg'
import marble_up from '../../../resources/marble_up.svg'
import marble_down from '../../../resources/marble_down.svg'

const Board = ({ board, loopAll, changeCell }) => {

  const shooter_imgs = {
    shooter_slider_left,
    shooter_slider_right,
    shooter_slider_up,
    shooter_slider_down,

    shooter_marble_left,
    shooter_marble_right,
    shooter_marble_up,
    shooter_marble_down
  }

  const slider_imgs = {
    slider_left,
    slider_right,
    slider_up,
    slider_down
  }

  const marble_imgs = {
    marble_left,
    marble_right,
    marble_up,
    marble_down
  }

  const getCell = cell => {
    switch(cell.type) {
      case 'shooter':
        console.log(cell.emits)
        return <Shooter imgs={shooter_imgs} {...cell} />
      case 'slider':
        return <Slider imgs={slider_imgs} {...cell} />
      case 'marble':
        return <Marble imgs={marble_imgs} {...cell} />
      default:
        return ''
    }
  }

  function handleContextMenu (e, y, x) {
    e.preventDefault()
    changeCell({ y, x })
  }

  const cellWrapper = (cell, y, x) => (
    <div
      key={`${x}_${y}`}
      className={`col ${cell.type}`}
      onContextMenu={e => handleContextMenu(e, y, x)}
    >
      {
        getCell(cell)
      }
    </div>
  )

  function generateRows () {
    const cols = []
    for (let c=0; c<board.length; c++) {
      const rows = []
      for (let r=0; r<board[0].length; r++) {
        const cell = board[c][r]
        rows.push(cellWrapper(cell, c, r))
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
