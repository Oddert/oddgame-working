import React from 'react'

const Painter = ({ handleSelectChange, painter }) => {

    const handleChange = e => {
        handleSelectChange(e.target.value)
    }

    return (
        <select onChange={handleChange} value={painter}>
            <option value='floor'>Floor</option>
            <option value='wall'>Wall</option>
            <option value='marble'>Marble</option>
            <option value='slider'>Slider</option>
            <option value='sentry'>Sentry</option>
            <option value='rotate'>Rotate</option>
            <option value='blackhole'>BlackHole</option>
            <option value='timer'>Timer</option>
            <option value='block'>Block</option>
            <option value='shooter'>Shooter</option>
        </select>
    )
}

export default Painter
