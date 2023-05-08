import React from 'react'

import LevelSet from '../LevelSet/LevelSet'

import defaultLevelSets from '../../../../../../utils/defaultLevelSets'

const PresetLevels = () => {
    return (
        <div>
            <h3>Preset Levels</h3>
            {Object.values(defaultLevelSets).map((file, idx) => (
                <LevelSet
                    key={idx}
                    isUserLevels={false}
                    levels={file.levels}
                    name={file.name}
                />
            ))}
        </div>
    )
}

export default PresetLevels
