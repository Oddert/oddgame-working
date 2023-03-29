import React from 'react'

const Magnet = ({ imgs, direction }) => (
    <img
        className='magnet__img'
        src={imgs[`magnet_${direction}`]}
        alt={`${direction} magnet`}
    />
)

export default Magnet
