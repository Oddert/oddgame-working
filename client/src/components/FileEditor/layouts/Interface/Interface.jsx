import React from 'react'
import { useDispatch } from 'react-redux'

import { filesToggleOpen } from '../../../../actions'

const Interface = ({ bottomControls, text, topControls }) => {
    const dispatch = useDispatch()

    const close = e => {
        e.stopPropagation()
        if (e.target.classList.contains('FileEditor--wrapper')) {
            dispatch(filesToggleOpen(true, false))
        }
    }

    return (
        <div className='FileEditor--wrapper one' onClick={close}>
            <h2>File Editor</h2>
            <div className='FileEditor'>
                <div>{topControls}</div>
                <div>{text}</div>
                <div>{bottomControls}</div>
            </div>
        </div>
    )
}

export default Interface
