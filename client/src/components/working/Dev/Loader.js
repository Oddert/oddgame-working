import React from 'react'
import { useSelector } from 'react-redux'

import LoadBoard from './LoadBoard'

const Loader = ({ defaultBoards, setBoard }) => (
  <div>
    {
      defaultBoards.map((each, idx) =>
        <LoadBoard
          key={idx}
          board={each.data}
          idx={idx}
          setBoard={setBoard}
        />)
      }
  </div>
)

export default Loader
