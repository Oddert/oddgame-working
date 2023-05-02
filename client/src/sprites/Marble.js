import React from 'react'

import temp from '../resources/marble_halted.svg'

const Slider = ({ emits, direction, imgs, halted }) => (
    <img
        className='marble__img'
        src={halted ? temp : imgs[`marble_${direction}`]}
        alt={`marble ${direction}`}
    />

)

export default Slider
