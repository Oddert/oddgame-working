import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { filesUpdateName } from '../../../../actions'

const Title = () => {
    const dispatch = useDispatch()
    const fileName = useSelector(state => state?.files?.name)

    const handleChangeTitle = (e) => {
        dispatch(filesUpdateName(e.target.value))
    }

    return (
        <input
            id='FileEditor__title'
            type='text'
            onChange={handleChangeTitle}
            value={fileName}
        />
    )
}

export default Title
