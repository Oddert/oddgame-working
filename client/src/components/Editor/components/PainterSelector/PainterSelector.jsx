import React from 'react'

import EntitySelector from '../EntitySelector/'
import EntityAttributeMenu from '../EntityAttributeMenu/'

/**
 * Renders {@link EntitySelector} and {@link EntityAttributeMenu} in a wrapper.
 * @category Editor
 * @subcategory Components
 * @component
 * @example
 *  return (
 *      <PainterSelector />
 *  )
 */
const PainterSelector = () => {
    return (
        <div>
            <h4>Cell Painter</h4>
            <EntitySelector />
            <EntityAttributeMenu />
        </div>
    )
}

export default PainterSelector
