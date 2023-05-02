import React, { Fragment } from 'react'


import BoardDimensions from '../../components/BoardDimensions/'
import CursorSelector from '../../components/CursorSelector/'
import PainterSelector from '../../components/PainterSelector/'
import Parser from '../../components/Parser'

/**
 * Layout component for the control-panel interface.
 * @component
 * @example
 *  return (
 *      <Menu />
 *  )
 */
const Menu = () => {
    return (
        <Fragment>
            <BoardDimensions />
            {/* <GameDetials /> */}
            <CursorSelector />
            <PainterSelector />
            <Parser />
        </Fragment>
    )
}

export default Menu
