import React from 'react'

import BottomControls from './layouts/BottomControls/BottomControls.jsx'
import Interface from './layouts/Interface'
import Text from './layouts/Text'
import TopControls from './layouts/TopControls'

import './FileEditor.scss'

/**
 * Renders the window to interact with text files.
 *
 * Follows the Layout-Component-Styles pattern.
 *  - Layout components arrange smaller single-functionality components.
 *  - Components represent a single piece of functionality, composed by a Layout.
 *  - Styles provide style overrides.
 *
 * This component renders a TopControls, BottomControls and Text section, wrapped by Interface.
 * @component
 * @example
 *  return (
 *      <FileEditor />
 *  )
 */
const FileEditor = () => {
    return (
        <Interface
            bottomControls={<BottomControls />}
            text={<Text />}
            topControls={<TopControls />}
        />
    )
}

export default FileEditor
