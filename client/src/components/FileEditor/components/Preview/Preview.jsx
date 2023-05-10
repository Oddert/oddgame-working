import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { convertTextToLevelSet } from '../../../../utils/textEditorUtils'
import readLevelFromText from '../../../../utils/readLevelFromText'

import ErrorList from './components/ErrorList/ErrorList'
import Boards from './components/Boards/Boards'

const Preview = () => {
    const [ errors, setErrors ] = useState([])
    const [ preview, setPreview ] = useState([])

    const text = useSelector(state => state.files.text)

    const handleClick = () => {
        const levelSet = convertTextToLevelSet(text, false, false)
        if (levelSet.errors.length) {
            setErrors(levelSet.errors)
            setPreview([])
        } else {
            setErrors([])
            setPreview(levelSet.set.levels.map(
                level => readLevelFromText(level.level)
            ))
        }
    }

    return (
        <div className='FileEditor__Preview'>
            <button onClick={handleClick}>
                Generate Preview
            </button>
            <ErrorList errors={errors} />
            <Boards boards={preview} />
        </div>
    )
}

export default Preview
