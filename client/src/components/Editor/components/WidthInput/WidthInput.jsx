import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editWriteCol, editWriteColsDirect } from '../../../../actions'

/**
 * Renders a number input to increase or decrease the edit board width.
 * @category Editor
 * @subcategory Components
 * @component
 * @example
 *  return (
 *      <WidthInput />
 *  )
 */
const WidthInput = () => {
    const dispatch = useDispatch()
    const board = useSelector(state => state.edit.data.board)

    const increment = useCallback(() => dispatch(editWriteCol(true)), [dispatch])

    const decrement = useCallback(() => dispatch(editWriteCol(false)), [dispatch])

    // OPTIMIZE: Make this use koos and await user enter key (also allow intenable values (e.g 0))
    const directSet = useCallback((e) => {
        const { value } = e.target
        if (value < 3) return
        return dispatch(editWriteColsDirect(value))
    }, [dispatch])

    const style = {
        flexDirection: 'row-reverse',
        alignItems: 'center',
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
                value={board[0].length}
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

export default WidthInput
