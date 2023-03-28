import React from 'react'

const Sentry = ({ emits, direction, imgs }) => (
    <img
        className='sentry__img'
        src={imgs[`sentry_${direction}`]}
        alt={`sentry ${direction}`}
    />
)

export default Sentry
