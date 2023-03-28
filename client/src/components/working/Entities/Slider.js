import React from 'react'

const Slider = ({ emits, direction, imgs, }) => (
    <img
        className='slider__img'
        src={imgs[`slider_${direction}`]}
        alt={`slider ${direction}`}
    />
)

export default Slider
