import React from 'react'
import { useSelector } from 'react-redux'

const SaveButton = () => {
    const unSavedChanges = useSelector(state => state.files.unSavedChanges)
    return (
        <button
            title={
                unSavedChanges
                    ? 'there are unsaved changes, click to save'
                    : 'changes saved'
            }
        >
            {
                unSavedChanges ? '•' : ''
            }
            Save
        </button>
    )
}

export default SaveButton
