import React from 'react'
// import { useSelector } from 'react-redux'

import Blackhole from '../Entities/Blackhole'
import Block from '../Entities/Block'
import Diamond from '../Entities/Diamond'
import Marble from '../Entities/Marble'
import Rotate from '../Entities/Rotate'
import Sentry from '../Entities/Sentry'
import Shooter from '../Entities/Shooter'
import Slider from '../Entities/Slider'
import Timer from '../Entities/Timer'
import Wall from '../Entities/Wall'

import '../index.scss'

import {
  blackhole_img,
  block_imgs,
  diamond_img,
  marble_imgs,
  rotate_imgs,
  sentry_imgs,
  shooter_imgs,
  slider_imgs,
  timer_imgs,
  wall_imgs
} from '../sprite_textures'

const Board = ({ board, changeCell }) => {

  const getCell = cell => {
    switch(cell.type) {
      case 'wall':
        return <Wall imgs={wall_imgs} {...cell} />
      case 'shooter':
        return <Shooter imgs={shooter_imgs} {...cell} />
      case 'slider':
        return <Slider imgs={slider_imgs} {...cell} />
      case 'marble':
        return <Marble imgs={marble_imgs} {...cell} />
      case 'rotate':
        return <Rotate imgs={rotate_imgs} {...cell} />
      case 'sentry':
        return <Sentry imgs={sentry_imgs} {...cell} />
      case 'blackhole':
        return <Blackhole img={blackhole_img} />
      case 'timer':
        return <Timer imgs={timer_imgs} {...cell} />
      case 'diamond':
        return <Diamond img={diamond_img} />
      case 'block':
        return <Block imgs={block_imgs} {...cell} />
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
      key={`${y}_${x}`}
      className={`col ${cell.type}`}
      onContextMenu={e => handleContextMenu(e, y, x)}
      title={`${y}_${x}`}
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
    <div className='Board' >
      <div>{ generateRows() }</div>
    </div>
  )
}

export default Board
