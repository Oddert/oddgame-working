import React from 'react'

const Block = ({ imgs, variant }) => (
    <img
        className='block__img'
        src={imgs[`block_${variant}`]}
        alt={`${variant} block`}
    />
)

export default Block
