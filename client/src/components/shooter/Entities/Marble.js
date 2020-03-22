import React from 'react'

const Slider = ({ emits, direction, imgs }) => (
  <img
    className='marble__img'
    src={imgs[`marble_${direction}`]}
    alt={`marble ${direction}`} 
  />

)

export default Slider
