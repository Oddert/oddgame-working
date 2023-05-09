import React from 'react'

import LevelSetSelector from '../../components/LevelSetSelector'
import NewLevelButton from '../../components/NewLevelButton/NewLevelButton'
import SaveButton from '../../components/SaveButton/SaveButton'

const TopControls = () => {
    return (
        <div>
            <SaveButton />
            <NewLevelButton />
            <LevelSetSelector />
        </div>
    )
}

export default TopControls
