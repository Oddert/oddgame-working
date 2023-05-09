import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { levelsDeleteUser, filesOpenSet } from '../../../../../../actions'

const LevelSet = ({ isUserLevels, levels, name }) => {
    const dispatch = useDispatch()

    const handleClickOpen = useCallback(() => {
        dispatch(filesOpenSet({ name, levels }, isUserLevels))
    }, [
        dispatch, isUserLevels, name, levels,
    ])

    const handleClickDelete = useCallback(() => {
        dispatch(levelsDeleteUser(name))
    }, [ dispatch, name ])

    return (
        <li>
            <button
                onClick={handleClickOpen}
            >
                {name}
            </button>
            {isUserLevels && (
                <button
                    onClick={handleClickDelete}
                    title='delete level'
                >
                    🗑
                </button>
            )}
        </li>
    )
}

export default LevelSet
