import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import rotateLeft from '../../../../../../resources/ui-rotate-left.png'
import rotateRight from '../../../../../../resources/ui-rotate-right.png'

import { getCell } from '../../../../../working/Utils/entityCellCreator'
import { editChangeCell } from '../../../../../../actions'

const directionsLookup = {
    up: {
        clockwise: 'right',
        antiClockwise: 'left',
    },
    right: {
        clockwise: 'down',
        antiClockwise: 'up',
    },
    down: {
        clockwise: 'left',
        antiClockwise: 'right',
    },
    left: {
        clockwise: 'up',
        antiClockwise: 'down',
    },
}

const WallAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    console.log(entity)
    const direction = entity?.direction

    const handleClickClockwise = useCallback(() => {
        const cell = {
            ...entity,
            direction: directionsLookup[direction].clockwise,
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x, direction,
    ])

    const handleClickAntiClockwise = useCallback(() => {
        const cell = {
            ...entity,
            direction: directionsLookup[direction].antiClockwise,
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x, direction,
    ])

    return (
        <div className='Selector'>
            <h5>Marble Direction</h5>
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
                        {getCell({ type: 'marble', direction })}
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
        </div>
    )
}

export default WallAttributes
