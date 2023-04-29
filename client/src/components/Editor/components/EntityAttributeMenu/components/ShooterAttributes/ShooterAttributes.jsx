import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import rotateLeft from '../../../../../../resources/ui-rotate-left.png'
import rotateRight from '../../../../../../resources/ui-rotate-right.png'

import { getCell } from '../../../../../../utils/entityCellCreator'
import { getAnticlockwise, getClockwise } from '../../../../../../utils/rotate'

import { editChangeCell } from '../../../../../../actions'

const DirectionSelector = ({ entityName, entityType }) => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    const direction = entity?.direction
    const emits = entity?.emits

    const handleClickClockwise = useCallback(() => {
        const cell = {
            ...entity,
            direction: getClockwise(direction),
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x, direction,
    ])

    const handleClickAntiClockwise = useCallback(() => {
        const cell = {
            ...entity,
            direction: getAnticlockwise(direction),
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x, direction,
    ])

    const handleClickSlider = useCallback(() => {
        const cell = {
            ...entity,
            emits: 'slider',
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    const handleClickMarble = useCallback(() => {
        const cell = {
            ...entity,
            emits: 'marble',
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    return (
        <div className='Selector'>
            <h5>Shooter Direction</h5>
            <div className='Selector__category centred'>
                <div className='Selector__option'>
                    <button
                        className='col'
                        onClick={handleClickAntiClockwise}
                    >
                        <img src={rotateLeft} alt='rotate anti-clockwise' />
                    </button>
                </div>
                <div className='Selector__option'>
                    <div
                        className='col larger'
                    >
                        {getCell({ type: 'shooter', direction, emits })}
                    </div>
                </div>
                <div className='Selector__option'>
                    <button
                        className='col'
                        onClick={handleClickClockwise}
                    >
                        <img src={rotateRight} alt='rotate clockwise' />
                    </button>
                </div>
            </div>
            <h5>Shooter Emits</h5>
            <div className='Selector__category centred'>
                <div
                    className='Selector__option'
                    onClick={handleClickSlider}
                >
                    <button
                        className={classNames(
                            'col',
                            emits === 'slider' ? 'selected' : null,
                        )}
                    >
                        {getCell({ type: 'slider', direction })}
                    </button>
                </div>
                <div
                    className='Selector__option'
                    onClick={handleClickMarble}
                >
                    <button
                        className={classNames(
                            'col',
                            emits === 'marble' ? 'selected' : null,
                        )}
                    >
                        {getCell({ type: 'marble', direction })}
                    </button>
                </div>
            </div>
        </div>
    )
}

DirectionSelector.propTypes = {
    entityName: PropTypes.string,
    entityType: PropTypes.string,
}

DirectionSelector.defaultProps = {
    entityName: 'marble',
    entityType: 'Marble',
}

export default DirectionSelector
