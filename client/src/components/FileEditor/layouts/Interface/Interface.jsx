import React from 'react'
import { useDispatch } from 'react-redux'

import { fileToggleOpen } from '../../../../actions'

const Interface = ({ bottomControls, text, topControls }) => {
    const dispatch = useDispatch()

    const close = e => {
        e.stopPropagation()
        console.log(e.target)
        console.log(e.target.classList.contains('FileEditor--wrapper'))
        if (e.target.classList.contains('FileEditor--wrapper')) {
            dispatch(fileToggleOpen(true, false))
        }
    }

    return (
        <div className='FileEditor--wrapper one' onClick={close}>
            <div className='FileEditor'>
                <div>{topControls}</div>
                <div>{text}</div>
                <div>{bottomControls}</div>
            </div>
        </div>
    )
}

export default Interface
