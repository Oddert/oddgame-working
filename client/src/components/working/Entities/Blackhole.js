import React from 'react'

const Blackhole = ({ imgs }) => (
  <img
    className='blackhole__img'
    data-img={`blackhole`}
    src={imgs['blackhole']}
    alt={`blackhole`}
  />
)

export default Blackhole
