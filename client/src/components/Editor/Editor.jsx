import React from 'react'

import Menu from '../working/Editor/Menu/'

import Board from './layouts/Board'

import Interface from './layouts/Interface/'

import './Editor.scss'

/**
 * Renders the window to edit levels.
 *
 * Follows the Layout-Component-Styles pattern.
 *  - Layout components arrange smaller single-functionality components.
 *  - Components represent a single piece of functionality, composed by a Layout.
 *  - Styles provide style overrides.
 *
 * This component renders a Board and Menu section, wrapped by Interface.
 * @component
 * @example
 *  return (
 *      <Editor />
 *  )
 */
const Editor = () => {
    return (
        <Interface board={<Board />} menu={<Menu />} />
    )
}

export default Editor
