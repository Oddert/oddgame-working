import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { getCell } from '../../../../../working/Utils/entityCellCreator'
import { editChangeCell } from '../../../../../../actions'

const RotateAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    console.log(entity)
    const direction = entity?.direction

    const handleClickClockwise = useCallback(() => {
        const cell = {
            ...entity,
            direction: 'clock',
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    const handleClickAntiClockwise = useCallback(() => {
        const cell = {
            ...entity,
            direction: 'anticlock',
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
                            direction === 'clock' ? 'selected' : null,
                        )}
                        onClick={handleClickClockwise}
                    >
                        {getCell({ type: 'rotate', direction: 'clock' })}
                    </button>
                    <label className='Selector__option__label'>
                        Clockwise
                    </label>
                </div>
                <div className='Selector__option spaced'>
                    <button
                        className={classNames(
                            'col',
                            direction === 'anticlock' ? 'selected' : null,
                        )}
                        onClick={handleClickAntiClockwise}
                    >
                        {getCell({ type: 'rotate', direction: 'anticlock' })}
                    </button>
                    <label className='Selector__option__label'>
                        Anti-Clockwise
                    </label>
                </div>
            </div>
        </div>
    )
}

export default RotateAttributes
