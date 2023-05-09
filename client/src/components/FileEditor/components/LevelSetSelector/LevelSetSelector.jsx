import React from 'react'

import PresetLevels from './components/PresetLevels/PresetLevels'
import UserLevels from './components/UserLevels/UserLevels'

const LevelSetSelector = () => {
    return (
        <div>
            <PresetLevels />
            <UserLevels />
        </div>
    )
}

export default LevelSetSelector
