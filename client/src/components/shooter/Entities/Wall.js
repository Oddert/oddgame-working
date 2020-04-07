import React from 'react'

const Wall = ({ imgs, variant }) => (
  <img
    className='wall__img'
    src={imgs[`wall_${variant}`]}
    alt={`wall ${variant}`}
  />
)

export default Wall
