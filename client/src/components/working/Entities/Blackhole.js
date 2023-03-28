import React from 'react'

const Blackhole = ({ imgs, cooldown, }) => (
    <img
        className='blackhole__img'
        data-img={`blackhole ${cooldown}`}
        src={imgs[cooldown ? `blackhole_${cooldown}` : 'blackhole']}
        alt={`blackhole ${cooldown}`}
    />
)

export default Blackhole
