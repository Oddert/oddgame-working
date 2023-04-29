import React, { Fragment } from 'react'

// import CellPainter from '../../../working/Editor/Menu/CellPainter/'
// import GameDetials from './GameDetials'
import Parser from '../../../working/Editor/Menu/Parser/'

import BoardDimensions from '../../components/BoardDimensions/'
import CursorSelector from '../../components/CursorSelector/'
import PainterSelector from '../../components/PainterSelector/'

/**
 * Layout component for the control-panel interface.
 * @component
 * @example
 *  return (
 *      <Menu />
 *  )
 */
const Menu = () => {
    // return <p>test</p>
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
