import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import BlockAttributes from './components/BlockAttributes/BlockAttributes'
import WallAttributes from './components/WallAttributes/WallAttributes'

const EntityAttributeMenu = () => {
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)
    const variant = entity?.variant ? ` (${entity.variant})` : ' '

    const editor = useMemo(() => {
        switch(entity.type) {
            case 'block':
                return <BlockAttributes />
            case 'wall':
                return <WallAttributes />
            case 'floor':
            case 'blackhole':
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
