import React from 'react'

import Blackhole from '../Entities/Blackhole'
import Block from '../Entities/Block'
import Diamond from '../Entities/Diamond'
import Enemy from '../Entities/Enemy'
import Forcefield from '../Entities/Forcefield'
import Kye from '../Entities/Kye'
import Magnet from '../Entities/Magnet'
import Marble from '../Entities/Marble'
import Rotate from '../Entities/Rotate'
import Sentry from '../Entities/Sentry'
import Shooter from '../Entities/Shooter'
import Slider from '../Entities/Slider'
import Timer from '../Entities/Timer'
import Wall from '../Entities/Wall'

import {
    blackhole_imgs,
    block_imgs,
    diamond_imgs,
    enemy_imgs,
    forcefield_imgs,
    kye_imgs,
    magnet_imgs,
    marble_imgs,
    rotate_imgs,
    sentry_imgs,
    shooter_imgs,
    slider_imgs,
    timer_imgs,
    wall_imgs,
} from '../sprite_textures'

export const getCell = cell => {
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
        return <Blackhole imgs={blackhole_imgs} />
    case 'timer':
        return <Timer imgs={timer_imgs} {...cell} />
    case 'diamond':
        return <Diamond imgs={diamond_imgs} />
    case 'block':
        return <Block imgs={block_imgs} {...cell} />
    case 'enemy':
        return <Enemy imgs={enemy_imgs} {...cell} />
    case 'forcefield':
        return <Forcefield imgs={forcefield_imgs} {...cell} />
    case 'magnet':
        return <Magnet imgs={magnet_imgs} {...cell} />
    case 'kye':
        return <Kye imgs={kye_imgs} />
    case 'toBeDeCoded':
        return '?'
    default:
        return ''
    }
}
