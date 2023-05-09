import React from 'react'

import LevelSetSelector from '../../components/LevelSetSelector'
import NewLevelButton from '../../components/NewLevelButton/NewLevelButton'
import UploadFile from '../../components/UploadFile/UploadFile'

const TopControls = () => {
    return (
        <div className='FileEditor__TopControls'>
            <NewLevelButton />
            <UploadFile />
            <LevelSetSelector />
        </div>
    )
}

export default TopControls
