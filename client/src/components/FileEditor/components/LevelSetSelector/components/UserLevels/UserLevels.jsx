import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isObject } from '../../../../../../utils/commonUtils'
import { mapUserLevelsToMenu } from '../../../../../../utils/textEditorUtils'

import LevelSet from '../LevelSet/LevelSet'
import { loadUserLevels } from '../../../../../../common/localStore/levelsLocalStore'
import { levelsWriteUser } from '../../../../../../actions'

const UserLevels = () => {
    const dispatch = useDispatch()

    const [ readFinished, setReadFinished ] = useState(false)

    const levels = useSelector(state => state.levels.userLevels)
    
    useEffect(() => {
        if (!readFinished) {
            const userLevels = loadUserLevels()
            if (isObject(userLevels)) {
                dispatch(
                    levelsWriteUser(
                        mapUserLevelsToMenu(userLevels)
                    )
                )
            }
            setReadFinished(true)
        }
    }, [ dispatch, readFinished ])

    return (
        <div className='FileEditor__LevelSet'>
            <h3>Your Levels</h3>
            <ul className='FileEditor__LevelSet__list'>
                {levels.map((file, idx) => (
                    <LevelSet
                        key={idx}
                        isUserLevels={true}
                        levels={file.levels}
                        name={file.name}
                    />
                ))}
            </ul>
        </div>
    )
}

export default UserLevels
