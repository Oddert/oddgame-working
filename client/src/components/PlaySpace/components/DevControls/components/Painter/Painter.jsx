import React from 'react'

const options = [
    { value: 'floor', label: 'Floor' },
    { value: 'wall', label: 'Wall' },
    { value: 'marble', label: 'Marble' },
    { value: 'slider', label: 'Slider' },
    { value: 'sentry', label: 'Sentry' },
    { value: 'rotate', label: 'Rotate' },
    { value: 'blackhole', label: 'BlackHole' },
    { value: 'timer', label: 'Timer' },
    { value: 'block', label: 'Block' },
    { value: 'shooter', label: 'Shooter' },
]

/**
 * Renders a select component to change the painter state.
 * @component
 * @param {function} props.setPainter Callback function to change the painter's value.
 * @param {function} props.painter The current painter value.
 */
const Painter = ({ setPainter, painter }) => {

    const handleChange = e => {
        setPainter(e.target.value)
    }

    return (
        <select onChange={handleChange} value={painter}>
            <option value='floor'>Floor</option>
            {options.map(option => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Painter
