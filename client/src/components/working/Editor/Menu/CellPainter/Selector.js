import React from 'react'

import Blackhole from '../../../Entities/Blackhole'
import Block from '../../../Entities/Block'
import Diamond from '../../../Entities/Diamond'
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
  marble_imgs,
  rotate_imgs,
  sentry_imgs,
  shooter_imgs,
  slider_imgs,
  timer_imgs,
  wall_imgs
} from '../../../sprite_textures'


const Selector = () => {

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


  const cellWrapper = cell => (
    <div
      key={`${cell.type}_${cell.variant || cell.emits || cell.direction || 'default'}`}
      className={`col ${cell.type}`}
      style={{ dispaly: 'inline-block', width: '50px' }}
      title={`${cell.type}_${cell.variant || cell.emits || cell.direction || 'default'}`}
    >
      {
        getCell(cell)
      }
    </div>
  )

  const structural = {
    displayName: 'Structural',
    ent: [
      { type: 'floor' },
      { type: 'wall', variant: 'square' },
      { type: 'wall', variant: 'round' },
      { type: 'block', variant: 'round' },
      { type: 'block', variant: 'soft' },
      { type: 'block', variant: 'square' },
    ]
  }

  const obsticals = {
    displayName: 'Obsticals',
    ent: [
      { type: 'blackhole' },
      { type: 'marble', direction: 'left' },
      { type: 'rotate', direction: 'clock' },
      { type: 'sentry', direction: 'left' },
      { type: 'shooter', direction: 'left', emits: 'slider' },
      { type: 'slider', direction: 'left' },
      { type: 'timer', time: 6 },
    ]
  }

  const gameplay = {
    displayName: 'Gameplay',
    ent: [
      { type: 'diamond' },
    ]
  }

  return (
    <div>
      {
        [structural, obsticals, gameplay].map((catt, c_i) =>
          <div key={`catt_${c_i}`}>
            <h5>{ catt.displayName }</h5>
            <div style={{ display: 'flex' }}>
              {
                catt.ent.map(entity => cellWrapper(entity))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Selector
