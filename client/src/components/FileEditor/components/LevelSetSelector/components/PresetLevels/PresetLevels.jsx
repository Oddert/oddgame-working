import React from 'react'

import LevelSet from '../LevelSet/LevelSet'

import defaultLevelSets from '../../../../../../utils/defaultLevelSets'

const PresetLevels = () => {
    return (
        <div className='FileEditor__LevelSet'>
            <h3>Preset Levels</h3>
            <ul className='FileEditor__LevelSet__list'>
                {Object.values(defaultLevelSets).map((file, idx) => (
                    <LevelSet
                        key={idx}
                        isUserLevels={false}
                        levels={file.levels}
                        name={file.name}
                    />
                ))}
            </ul>
        </div>
    )
}

export default PresetLevels
