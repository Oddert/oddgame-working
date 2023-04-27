import React from 'react'
import { useSelector } from 'react-redux'

const EntityAttributeMenu = () => {
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)
    const variant = entity?.variant ? ` (${entity.variant})` : ' '
    return (
        <div>
            <p>Selected entity: {entity.type}{variant} at Y: {y}, X: {x}</p>
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
