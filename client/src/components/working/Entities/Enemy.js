import React from 'react'

const Enemy = ({ imgs, variant }) => (
  <img
    className='enemy__img'
    src={imgs[`enemy_${variant}`]}
    alt={`${variant} enemy`}
  />
)

export default Enemy
