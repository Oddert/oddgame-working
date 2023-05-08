import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filesUpdateName, filesUpdateText } from '../../../../actions'

const Text = () => {
    const dispatch = useDispatch()
    const text = useSelector(state => state?.files?.text)
    const fileName = useSelector(state => state?.files?.name)

    const handleChangeText = (e) => {
        dispatch(filesUpdateText(e.target.value))
    }

    const handleChangeTitle = (e) => {
        dispatch(filesUpdateName(e.target.value))
    }

    return (
        <div className='FileEditor__text'>
            <label htmlFor='FileEditor__title'>Title</label>
            <input id='FileEditor__title' type='text' onChange={handleChangeTitle} value={fileName} />
            <label htmlFor='FileEditor__body'>File</label>
            <textarea
                id='FileEditor__body'
                onChange={handleChangeText}
                value={text}
                rows='40'
                cols='50'
            />
        </div>
    )
}

export default Text
