import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { editChangeCell } from '../../../../../../actions'

const TimerAttributes = () => {
    const dispatch = useDispatch()
    const { entity, y, x } = useSelector(state => state.edit.painter.focus)

    const time = entity?.time
    const speed = entity?.speed

    const handleChangeTime = useCallback((e) => {
        const cell = {
            ...entity,
            time: e.currentTarget.value,
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    const handleChangeSpeed = useCallback((e) => {
        const cell = {
            ...entity,
            speed: e.currentTarget.value,
        }
        dispatch(editChangeCell(y, x, cell))
    }, [
        dispatch, entity, y, x,
    ])

    const handleClickReset = useCallback((e) => {
        const cell = {
            ...entity,
            speed: 6,
            time: 6,
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
                    <label htmlFor='TimerAttributes-time'>
                        Time: {time}
                    </label>
                    <input
                        id='TimerAttributes-time'
                        onChange={handleChangeTime}
                        max='9'
                        min='3'
                        type='range'
                        value={time}
                    />
                </div>
                <div className='Selector__option'>
                    <label htmlFor='TimerAttributes-speed'>
                        Speed: {speed}
                    </label>
                    <input
                        id='TimerAttributes-speed'
                        onChange={handleChangeSpeed}
                        max='9'
                        min='3'
                        type='range'
                        value={speed}
                    />
                </div>
                <button onClick={handleClickReset}>
                    Reset to Defaults
                </button>
            </div>
        </div>
    )
}

export default TimerAttributes
