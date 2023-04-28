import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCell } from '../../../../../working/Utils/entityCellCreator'
import { editChangeCell } from '../../../../../../actions'

const BlockAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)
    const selectedVariant = entity?.variant

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
        const selected = selectedVariant === variant ? 'selected' : ''
        return (
            <div className='Selector__option'>
                <button
                    className={`col ${selected}`}
                    onClick={() => handleClick(variant, direction)}
                >
                    {getCell({ type: 'block', variant, direction })}
                </button>
            </div>
        )
    }

    return (
        <div className='Selector'>
            <div className='Selector__category'>
                {option('square', null)}
                {option('round', null)}
                {option('soft', null)}
            </div>
        </div>
    )
}

export default BlockAttributes
