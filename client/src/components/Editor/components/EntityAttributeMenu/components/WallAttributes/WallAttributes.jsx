import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCell } from '../../../../../../utils/entityCellCreator'
import { editChangeCell } from '../../../../../../actions'

const WallAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    console.log(entity)
    const selectedVariant = entity?.variant
    const selectedDirection = entity?.direction

    const handleClick = useCallback((variant, direction) => {
        const cell = {
            ...entity,
            variant,
            direction,
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    const option = (variant, direction) => {
        const selected = (selectedVariant === variant && selectedDirection === direction)
            ? 'selected'
            : ''
        return (
            <div className='Selector__option'>
                <button
                    className={`col ${selected}`}
                    onClick={() => handleClick(variant, direction)}
                >
                    {getCell({ type: 'wall', variant, direction })}
                </button>
            </div>
        )
    }

    return (
        <div className='Selector'>
            <h5>Wall Variant</h5>
            <div className='Selector__category'>
                {option('square')}
                {option('round', 5)}
                {option('round', 1)}
                {option('round', 3)}
                {option('round', 7)}
                {option('round', 9)}
                {option('round', 2)}
                {option('round', 4)}
                {option('round', 6)}
                {option('round', 8)}
            </div>
        </div>
    )
}

export default WallAttributes
