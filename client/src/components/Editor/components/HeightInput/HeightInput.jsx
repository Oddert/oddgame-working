import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editWriteRow, editWriteRowsDirect } from '../../../../actions'

/**
 * Renders a number input to increase or decrease the edit board height.
 * @category Editor
 * @subcategory Components
 * @component
 * @example
 *  return (
 *      <HeightInput />
 *  )
 */
const HeightInput = () => {
    const dispatch = useDispatch()
    const board = useSelector(state => state.edit.data.board)

    const increment = useCallback(() => dispatch(editWriteRow(true)), [dispatch])

    const decrement = useCallback(() => dispatch(editWriteRow(false)), [dispatch])

    // OPTIMIZE: Make this use koos and await user enter key (also allow intenable values (e.g 0))
    const directSet = useCallback((e) => {
        const { value } = e.target
        if (value < 3) return
        dispatch(editWriteRowsDirect(value))
    }, [dispatch])

    const style = {
        flexDirection: 'column',
        alignItems: 'stretch',
    }

    return (
        <div className='Rowcol' style={style}>
            <button
                onClick={increment}
            >
                +
            </button>
            <input
                type='number'
                value={board.length}
                onChange={directSet}
            />
            <button
                onClick={decrement}
            >
                -
            </button>
        </div>
    )
}

export default HeightInput
