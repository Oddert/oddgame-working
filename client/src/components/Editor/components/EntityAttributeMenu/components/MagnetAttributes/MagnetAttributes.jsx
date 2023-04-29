import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { getCell } from '../../../../../working/Utils/entityCellCreator'
import { editChangeCell } from '../../../../../../actions'

const MagnetAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    const direction = entity?.direction

    const handleClickVertical = useCallback(() => {
        const cell = {
            ...entity,
            direction: 'vertical',
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    const handleClickHorizontal = useCallback(() => {
        const cell = {
            ...entity,
            direction: 'horizontal',
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    return (
        <div className='Selector'>
            <h5>Rotate Direction</h5>
            <div className='Selector__category centred'>
                <div className='Selector__option spaced'>
                    <button
                        className={classNames(
                            'col',
                            direction === 'vertical' ? 'selected' : null,
                        )}
                        onClick={handleClickVertical}
                    >
                        {getCell({ type: 'magnet', direction: 'vertical' })}
                    </button>
                    <label className='Selector__option__label'>
                        Vertical
                    </label>
                </div>
                <div className='Selector__option spaced'>
                    <button
                        className={classNames(
                            'col',
                            direction === 'horizontal' ? 'selected' : null,
                        )}
                        onClick={handleClickHorizontal}
                    >
                        {getCell({ type: 'magnet', direction: 'horizontal' })}
                    </button>
                    <label className='Selector__option__label'>
                        Horizontal
                    </label>
                </div>
            </div>
        </div>
    )
}

export default MagnetAttributes
