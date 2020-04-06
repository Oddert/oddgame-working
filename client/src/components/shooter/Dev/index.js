import React from 'react'

import Loader from './Loader'
import Painter from './Painter'

const Dev = ({ board, handleSelectChange, painter, defaultBoards, setBoard }) => (
  <div>
    <button onClick={() => console.log(board)}>Log Board</button>
    <Painter handleSelectChange={handleSelectChange} painter={painter} />
    <Loader defaultBoards={defaultBoards} setBoard={setBoard} />
  </div>
)

export default Dev
