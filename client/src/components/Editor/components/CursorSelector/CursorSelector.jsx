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

    const handleChange = useCallback((m) => {
        // console.log(m);
        dispatch(editPainterModeSwitch(m))
    }, [dispatch])

    // console.log(mode, modes)
    return (
        <form>
            {
                modes.map(option => {
                    // console.log(option, mode, option === mode)
                    const checked = mode === option
                    return (
                        <div key={option}>
                            <input
                                id={`CursorSelector-${option}`}
                                type='radio'
                                value={option}
                                checked={checked}
                                onChange={() => handleChange(option)}
                            />
                            <label
                                htmlFor={`CursorSelector-${option}`}
                            >
                                { option } {String(mode === option)}
                            </label>
                        </div>
                    )
                })
            }
        </form>
    )
}

export default CursorSelector
