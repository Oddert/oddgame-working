import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import BlockAttributes from './components/BlockAttributes/BlockAttributes'
import ForcefieldAttributes from './components/ForcefieldAttributes/ForcefieldAttributes'
import EnemyAttributes from './components/EnemyAttributes/EnemyAttributes'
import MagnetAttributes from './components/MagnetAttributes/MagnetAttributes'
import MarbleAttributes from './components/MarbleAttributes/MarbleAttributes'
import RotateAttributes from './components/RotateAttributes/RotateAttributes'
import SentryAttributes from './components/SentryAttributes/SentryAttributes'
import ShooterAttributes from './components/ShooterAttributes/ShooterAttributes'
import SliderAttributes from './components/SliderAttributes/SliderAttributes'
import TimerAttributes from './components/TimerAttributes/TimerAttributes'
import WallAttributes from './components/WallAttributes/WallAttributes'

const EntityAttributeMenu = () => {
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)
    const variant = entity?.variant ? ` (${entity.variant})` : ' '

    const editor = useMemo(() => {
        switch(entity.type) {
            case 'block':
                return <BlockAttributes />
            case 'forcefield':
                return <ForcefieldAttributes />
            case 'enemy':
                return <EnemyAttributes />
            case 'magnet':
                return <MagnetAttributes />
            case 'marble':
                return <MarbleAttributes />
            case 'rotate':
                return <RotateAttributes />
            case 'sentry':
                return <SentryAttributes />
            case 'shooter':
                return <ShooterAttributes />
            case 'slider':
                return <SliderAttributes />
            case 'timer':
                return <TimerAttributes />
            case 'wall':
                return <WallAttributes />
            case 'blackhole':
            case 'diamond':
            case 'floor':
            case 'kye':
                return null;
            default:
                return <p>Selected entity: {entity.type}{variant} at Y: {y}, X: {x}</p>
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entity.type])

    return (
        <div>
            {editor}
        </div>
    )
}

export default EntityAttributeMenu

// block
//  -.variant (square, round, soft)

// marble
//  -.direction (right, left, up, down)

// rotate
//  -.direction (clock, anticlock)

// sentry
//  -.direction (left, right, up, down)

// shooter
//  -.direction (left, right, up, down)
//  -.emits (slider, amrble)

// slider
//  -.direction (left, right, up, down)

// timer
//  -.time (3-9)
