import React from 'react'

const Timer = ({ time, imgs }) => (
  <img
    className='timer__img'
    data-img={`timer_${time}`}
    src={imgs[`timer_${time}`]}
    alt={`timer ${time}`}
  />
)

export default Timer
