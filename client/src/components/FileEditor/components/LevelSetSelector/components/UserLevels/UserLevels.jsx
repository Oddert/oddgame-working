import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filesSaveUserAndNew } from '../../../../../../actions'

import LevelSet from '../LevelSet/LevelSet'
import { convertTextToLevelSet } from '../../../../../../utils/textEditorUtils'

const isObject = obj =>
    obj && typeof obj === 'object' && !Array.isArray(obj)

const UserLevels = () => {
    const dispatch = useDispatch()
    const [ levels, setLevels ] = useState([])
    const [ readFinished, setReadFinished ] = useState(false)
    
    const unSavedChanges = useSelector(state => state.files.unSavedChanges)

    useEffect(() => {
        if (!readFinished) {
            const userLevels = localStorage.getItem('KYE_USER_LEVELS')
            if (userLevels) {
                const parsed = JSON.parse(userLevels)
                if (isObject(parsed)) {
                    setLevels(Object.keys(parsed).map(key => ({
                        name: key,
                        levels: convertTextToLevelSet(parsed[key]).set.levels,
                    })))
                }
            }
            setReadFinished(true)
        }
    }, [readFinished])

    const handleClickNew = useCallback(() => {
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

    console.log(levels)
    return (
        <div>
            <h3>Your Levels</h3>
            {levels.map((file, idx) => (
                <LevelSet
                    key={idx}
                    isUserLevels={true}
                    levels={file.levels}
                    name={file.name}
                />
            ))}
            <button onClick={handleClickNew}>Create New +</button>
        </div>
    )
}

export default UserLevels
