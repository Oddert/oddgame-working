import React from 'react'

import GameDetials from './GameDetials'
import BoardSetup from './BoardSetup'
import CellPainter from './CellPainter'

const Menu = () => {
  return (
    <>
      <h3>Edit Tools</h3>
      <GameDetials />
      <BoardSetup />
      <CellPainter />
    </>
  )
}

export default Menu
