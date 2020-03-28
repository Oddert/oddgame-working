import React from 'react'

import Shooter from '../Entities/Shooter'
import Slider from '../Entities/Slider'
import Marble from '../Entities/Marble'
import Rotate from '../Entities/Rotate'
import Sentry from '../Entities/Sentry'

import '../index.scss'

import {
  shooter_imgs,
  slider_imgs,
  marble_imgs,
  rotate_imgs,
  sentry_imgs
} from '../sprite_textures'

const Board = ({ board, loopAll, changeCell }) => {

  const getCell = cell => {
    switch(cell.type) {
      case 'shooter':
        console.log(cell)
        return <Shooter imgs={shooter_imgs} {...cell} />
      case 'slider':
        return <Slider imgs={slider_imgs} {...cell} />
      case 'marble':
        return <Marble imgs={marble_imgs} {...cell} />
      case 'rotate':
        return <Rotate imgs={rotate_imgs} {...cell} />
      case 'sentry':
        return <Sentry imgs={sentry_imgs} {...cell} />
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
