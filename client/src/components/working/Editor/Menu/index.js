import React from 'react'

import BoardSetup from './BoardSetup'
import CellPainter from './CellPainter/'
import Cursor from './Cursor'
// import GameDetials from './GameDetials'
import Parser from './Parser/'

const Menu = () => {
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
