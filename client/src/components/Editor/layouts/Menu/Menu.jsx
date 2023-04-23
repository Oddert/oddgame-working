import React from 'react'

import BoardSetup from '../../../working/Editor/Menu/BoardSetup'
import CellPainter from '../../../working/Editor/Menu/CellPainter/'
import Cursor from '../../../working/Editor/Menu/Cursor'
// import GameDetials from './GameDetials'
import Parser from '../../../working/Editor/Menu/Parser/'

const Menu = () => {
    // return <p>test</p>
    return (
        <>
            {/* <h3>Edit Tools</h3> */}
            <BoardSetup />
            {/* <GameDetials /> */}
            <Cursor />
            <CellPainter />
            <Parser />
        </>
    )
}

export default Menu
