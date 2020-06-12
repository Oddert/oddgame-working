import React from 'react'
// import { useSelector } from 'react-redux'

import Blackhole from '../Entities/Blackhole'
import Block from '../Entities/Block'
import Diamond from '../Entities/Diamond'
import Enemy from '../Entities/Enemy'
import Forcefield from '../Entities/Forcefield'
import Magnet from '../Entities/Magnet'
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
  enemy_imgs,
  forcefield_imgs,
  magnet_imgs,
  marble_imgs,
  rotate_imgs,
  sentry_imgs,
  shooter_imgs,
  slider_imgs,
  timer_imgs,
  wall_imgs,
} from '../sprite_textures'

const Board = ({ board, handleCellClick, focus, handleMouseEnter }) => {

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
      case 'enemy':
        return <Enemy imgs={enemy_imgs} {...cell} />
      case 'forcefield':
        return <Forcefield imgs={forcefield_imgs} {...cell} />
      case 'magnet':
        return <Magnet imgs={magnet_imgs} {...cell} />
      case 'toBeDeCoded':
        return '?'
      default:
        return ''
    }
  }

  function handleClick (e, y, x) {
    e.preventDefault()
    handleCellClick({ y, x })
  }

  const focused = (y, x) => {
    if (focus && focus.x && focus.y) {
      return focus.x === x && focus.y === y ? 'focused' : ''
    } else return ''
  }

  const mouseDidEnter = (e, y, x) => {
    if (handleMouseEnter) handleMouseEnter(e, y, x)
  }

  const cellWrapper = (cell, y, x) => (
    <div
      key={`${y}_${x}`}
      className={`col ${cell.type} ${cell.variant || 'default'} ${focused(y, x)}`}
      onMouseDown={e => handleClick(e, y, x)}
      title={`${y}_${x} ${cell.info || cell.type}`}
      onMouseEnter={e => mouseDidEnter(e, y, x)}
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
