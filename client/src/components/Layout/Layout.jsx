
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    editToggleOpen,
    editWriteBoardNew,
    uiMousedownLow,
    uiMousedownHigh,
} from '../../actions'

import Editor from '../Editor/'
import PlaySpace from '../PlaySpace/'

/**
 * Entry point for the game.
 *
 * Rendered by the index file under necessary contexts & wrappers.
 * @component
 */
const Layout = () => {
    const dispatch = useDispatch()

    const { open } = useSelector(state => state.edit)
    const { mouseIsDown } = useSelector(state => state.ui)

    const handleMouseDown = e => {
        if (!mouseIsDown) dispatch(uiMousedownHigh())
        return
    }

    const handleMouseUp = e => {
        if (mouseIsDown) dispatch(uiMousedownLow())
        return
    }

    const newLevel = () => {
        dispatch(editWriteBoardNew())
        dispatch(editToggleOpen())
    }

    return (
        <div className='Layout' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <button onClick={newLevel}>New Level +</button>
            <PlaySpace />
            {open && <Editor />}
        </div>
    )
}

export default Layout
