import React from 'react'

import BoardSetup from './BoardSetup'
import CellPainter from './CellPainter/'
// import GameDetials from './GameDetials'

const Menu = () => {
  return (
    <>
      {/* <h3>Edit Tools</h3> */}
      <BoardSetup />
      {/* <GameDetials /> */}
      <CellPainter />
    </>
  )
}

export default Menu
