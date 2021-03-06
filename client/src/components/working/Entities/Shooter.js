import React from 'react'

const Shooter = ({ emits, direction, imgs }) => (
  <img
    className='shooter__img'
    src={imgs[`shooter_${emits}_${direction}`]}
    alt={`shooter ${direction}`}
  />
)

export default Shooter
