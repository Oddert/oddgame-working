import React from 'react'

import Loader from './Loader'
import Painter from './Painter'

const Dev = ({ board, handleSelectChange, painter, defaultBoards, setBoard, loopAll }) => (
  <div>
    <button onClick={() => console.log(board)}>Log Board</button>
    <Painter handleSelectChange={handleSelectChange} painter={painter} />
    <Loader defaultBoards={defaultBoards} setBoard={setBoard} />
    <button className='ticker' onClick={loopAll}>Tick</button>
  </div>
)

export default Dev
