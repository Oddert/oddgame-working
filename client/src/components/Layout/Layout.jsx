
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    editToggleOpen,
    editWriteBoardNew,
    uiMousedownLow,
    uiMousedownHigh,
    fileToggleOpen,
} from '../../actions'

import Editor from '../Editor/'
import PlaySpace from '../PlaySpace/'
import FileEditor from '../FileEditor/FileEditor'

/**
 * Entry point for the game.
 *
 * Rendered by the index file under necessary contexts & wrappers.
 * @component
 */
const Layout = () => {
    const dispatch = useDispatch()

    const graphicalEditorOpen = useSelector(state => state.edit.open)
    const fileEditorOpen = useSelector(state => state.files.open)

    const { mouseIsDown } = useSelector(state => state.ui)

    const handleMouseDown = e => {
        if (!mouseIsDown) dispatch(uiMousedownHigh())
        return
    }

    const handleMouseUp = e => {
        if (mouseIsDown) dispatch(uiMousedownLow())
        return
    }

    const graphicalEditor = () => {
        dispatch(editWriteBoardNew())
        dispatch(editToggleOpen())
    }

    const textEditor = () => {
        dispatch(fileToggleOpen())
    }

    console.log({ graphicalEditorOpen, fileEditorOpen })

    return (
        <div className='Layout' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <button onClick={graphicalEditor}>Graphical Editor</button>
            <button onClick={textEditor}>Text Editor</button>
            <PlaySpace />
            {graphicalEditorOpen && <Editor />}
            {fileEditorOpen && <FileEditor />}
        </div>
    )
}

export default Layout
