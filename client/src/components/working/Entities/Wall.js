import React from 'react'

const Wall = ({ imgs, variant, direction, debug, }) => (
    <img
        className='wall__img'
        src={imgs[variant === 'square' ? 'wall_square' : `wall_${variant}_${direction}`]}
        alt={`wall ${variant} ${direction}`}
    />
)

export default Wall
