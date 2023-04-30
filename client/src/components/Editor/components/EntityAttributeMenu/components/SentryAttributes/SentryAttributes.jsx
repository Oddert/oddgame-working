import React, { Fragment, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { editChangeCell } from '../../../../../../actions'

import DirectionSelector from '../DirectionSelector/DirectionSelector'

const SentryAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    const speed = entity?.speed
 
    const handleChangeTime = useCallback((e) => {
        const cell = {
            ...entity,
            speed: e.currentTarget.value,
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])
    
    return (
        <Fragment>
            <DirectionSelector
                entityName='Sentry'
                entityType='sentry'
            />
            <div className='Selector'>
                <h5>Shooter Direction</h5>
                <div className='Selector__category centred'>
                    <div className='Selector__option'>
                        <label htmlFor='SentryAttributes-speed'>
                            Speed: {speed}
                        </label>
                        <input
                            id='SentryAttributes-speed'
                            onChange={handleChangeTime}
                            max='9'
                            min='3'
                            type='range'
                            value={speed}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SentryAttributes
