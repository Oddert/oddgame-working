import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editPainterModeSwitch } from '../../../../actions'

/**
 * ALlows the user to toggle the painter mode between 'selector' and 'brush'.
 * @category Editor
 * @subcategory Components
 * @component
 * @example
 *  return (
 *      <CursorSelector />
 *  )
 */
const CursorSelector = () => {
    const dispatch = useDispatch()
    const { mode } = useSelector(state => state.edit.painter)

    const modes = [ 'selector', 'brush' ]

    const handleChange = useCallback((m) => dispatch(editPainterModeSwitch(m)), [dispatch])

    return (
        <form>
            {
                modes.map(option =>
                    <label key={option}>
                        <input
                            type='radio'
                            value={option}
                            checked={mode === option}
                            onChange={() => handleChange(option)}
                        />
                        { option }
                    </label>
                )
            }
        </form>
    )
}

export default CursorSelector
