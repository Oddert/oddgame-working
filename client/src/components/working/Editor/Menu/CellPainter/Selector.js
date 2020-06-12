import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editChangePainterSelect } from '../../../../../actions'

import Blackhole from '../../../Entities/Blackhole'
import Block from '../../../Entities/Block'
import Diamond from '../../../Entities/Diamond'
import Enemy from '../../../Entities/Enemy'
import Forcefield from '../../../Entities/Forcefield'
import Magnet from '../../../Entities/Magnet'
import Marble from '../../../Entities/Marble'
import Rotate from '../../../Entities/Rotate'
import Sentry from '../../../Entities/Sentry'
import Shooter from '../../../Entities/Shooter'
import Slider from '../../../Entities/Slider'
import Timer from '../../../Entities/Timer'
import Wall from '../../../Entities/Wall'


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
} from '../../../sprite_textures'


const Selector = () => {
  const entities = useSelector(state => state.edit.entities)
  const selected = useSelector(state => state.edit.painter.selected)

  const dispatch = useDispatch()

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


  const cellWrapper = (cell, selected) => (
    <button
      key={`${cell.type}_${cell.variant || cell.emits || cell.direction || 'default'}`}
      className={`col ${cell.type} ${selected === cell.idx ? 'selected' : ''}`}
      title={`${cell.type}_${cell.variant || cell.emits || cell.direction || 'default'}`}
      onClick={() => select(selected, cell.idx)}
    >
      {
        getCell(cell)
      }
    </button>
  )


  const cattegories = entities.reduce((acc, each, idx) => {
    if (!acc.hasOwnProperty(each.catt)) console.error('No such key on accumulator, Selector.js pre-render', { acc, each })
    each.idx = idx
    acc[each.catt].ent.push(each)
    return acc
  }, {
    structural: { displayName: 'Structural', ent: [] },
    obstical: { displayName: 'Obsticals', ent: [] },
    gameplay: { displayName: 'Gameplay', ent: [] }
  })

  const select = (selected, idx) => {
    if (selected !== idx) dispatch(editChangePainterSelect(idx))
  }

  return (
    <div className='Selector'>
      {
        Object.keys(cattegories).map((catt, c_i) =>
          <div key={`catt_${c_i}`}>
            <h5 className='Selector__cattegory--title'>{ cattegories[catt].displayName }</h5>
            <div className='Selector__cattegory'>
              {
                cattegories[catt].ent.map(entity => cellWrapper(entity, selected))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Selector
