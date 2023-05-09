import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filesSaveUser } from '../../../../actions'
import { convertTextToLevelSet } from '../../../../utils/textEditorUtils'

const SaveButton = () => {
    const dispatch = useDispatch()

    const unSavedChanges = useSelector(state => state.files.unSavedChanges)
    const name = useSelector(state => state.files.name)
    const text = useSelector(state => state.files.text)

    const handleClick = useCallback(() => {
        const test = convertTextToLevelSet(text, true, true)
        if (!test.length) {
            dispatch(filesSaveUser(name, text))
        }
    }, [
        dispatch, name, text, 
    ])

    return (
        <button
            onClick={handleClick}
            disabled={!unSavedChanges}
            title={
                unSavedChanges
                    ? 'There are unsaved changes. Click to save'
                    : 'No changes to save'
            }
        >
            {
                unSavedChanges ? '• ' : '  '
            }
            Save
        </button>
    )
}

export default SaveButton
