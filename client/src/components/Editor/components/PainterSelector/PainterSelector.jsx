import React, { Fragment } from 'react'

import EntitySelector from '../EntitySelector/'
import EntityAttributeMenu from '../EntityAttributeMenu/'
import { useSelector } from 'react-redux'

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
    const painterMode = useSelector(state => state.edit.painter.mode)
    return (
        <div>
            {painterMode === 'brush' &&
                (
                    <Fragment>
                        <h4>Cell Painter</h4>
                        <EntitySelector />
                    </Fragment>
                )
            }
            <h4>Attributes</h4>
            <EntityAttributeMenu />
        </div>
    )
}

export default PainterSelector
