import React, { Fragment, useState } from 'react'

import PresetLevels from './components/PresetLevels/PresetLevels'
import UserLevels from './components/UserLevels/UserLevels'

const LevelSetSelector = () => {
    const [ open, setOpen ] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div>
            <button
                title='toggle Level Sets drop-down'
                onClick={handleClick}    
            >
                Level Sets {open ? '🞁' : '🞃'}
            </button>
            {open && (
                <Fragment>
                    <PresetLevels />
                    <UserLevels />
                </Fragment>
            )}
        </div>
    )
}

export default LevelSetSelector
