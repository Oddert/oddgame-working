import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filesSaveUserAndNew } from '../../../../actions'

const NewLevelButton = () => {
    const dispatch = useDispatch()
    const unSavedChanges = useSelector(state => state.files.unSavedChanges)

    const handleClick = useCallback(() => {
        const newLevel = () => {
            dispatch(filesSaveUserAndNew())
        }
        if (unSavedChanges) {
            if (window.confirm(
                'This file has unsaved changes. Are you sure you want to create a new level?'
            )) {
                console.log('create level 1')
                newLevel()
            }
        } else {
            console.log('create level 2')
            newLevel()
        }
    }, [ dispatch, unSavedChanges ])

    return (
        <button
            onClick={handleClick}
        >
            Create New +
        </button>
    )
}

export default NewLevelButton
