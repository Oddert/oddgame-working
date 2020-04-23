import React from 'react'

const Rotate = ({ direction, imgs }) => (
  <img
    className='rotate__img'
    data-img={`rotate_${direction}`}
    src={imgs[`rotate_${direction}`]}
    alt={`rotate ${direction}`}
  />
)

export default Rotate
