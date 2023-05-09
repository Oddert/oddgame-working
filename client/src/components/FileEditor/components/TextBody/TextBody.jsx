import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filesUpdateText } from '../../../../actions'

const TextBody = () => {
    const dispatch = useDispatch()
    const text = useSelector(state => state?.files?.text)

    const handleChangeText = useCallback((e) => {
        dispatch(filesUpdateText(e.target.value))
    }, [dispatch])

    return (
        <textarea
            id='FileEditor__body'
            onChange={handleChangeText}
            value={text}
            rows='40'
            cols='50'
        />
    )
}

export default TextBody
