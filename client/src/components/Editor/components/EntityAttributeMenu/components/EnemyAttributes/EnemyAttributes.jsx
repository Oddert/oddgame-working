import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { getCell } from '../../../../../working/Utils/entityCellCreator'
import { editChangeCell } from '../../../../../../actions'

const enemies = [
    { type: 'cloud', label: 'Cloud' },
    { type: 'cross', label: 'Cross' },
    { type: 'wheel', label: 'Wheel' },
    { type: 'teeth', label: 'Teeth' },
    { type: 'snake', label: 'Snake' },
]

const EnemyAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    const variant = entity?.variant

    const handleClick = useCallback((e) => {
        const type = e?.currentTarget?.dataset?.type
        if (type) {
            const cell = {
                ...entity,
                variant: type,
            }
            dispatch(editChangeCell(y, x, cell))
        }
    }, [
        dispatch, entity, y, x, 
    ])

    return (
        <div className='Selector'>
            <h5>Enemy Type</h5>
            <div className='Selector__category centred'>
                {enemies.map(({ type, label }) => (
                    <div className='Selector__option spaced' key={type}>
                        <button
                            className={classNames(
                                'col',
                                variant === type ? 'selected' : null,
                            )}
                            data-type={type}
                            onClick={handleClick}
                        >
                            {getCell({ type: 'enemy', variant: type })}
                        </button>
                        <label className='Selector__option__label'>
                            {label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EnemyAttributes
