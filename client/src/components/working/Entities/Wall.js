import React from 'react'

const Wall = ({ imgs, variant, debug }) => {
  if (debug) console.log(imgs, variant)
  return (
  <img
    className='wall__img'
    src={imgs[`wall_${variant}`]}
    alt={`wall ${variant}`}
  />
)}

export default Wall
