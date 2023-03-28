import React from 'react'

const Forcefield = ({ imgs, direction, }) => (
    <img
        className='forcefield__img'
        src={imgs[`forcefield_${direction}`]}
        alt={`${direction} forcefield`}
    />
)

export default Forcefield
