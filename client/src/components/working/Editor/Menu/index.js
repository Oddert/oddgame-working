import React from 'react'

import GameDetials from './GameDetials'
import BoardSetup from './BoardSetup'
import CellPainter from './CellPainter/'

const Menu = () => {
  return (
    <>
      {/* <h3>Edit Tools</h3> */}
      <BoardSetup />
      <GameDetials />
      <CellPainter />
    </>
  )
}

export default Menu
