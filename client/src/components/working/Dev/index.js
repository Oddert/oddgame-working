import React from 'react'

import Loader from './Loader'
import Painter from './Painter'

const Dev = ({ board, handleSelectChange, painter, defaultBoards, setBoard, loopAll, play, stopTick }) => (
  <div>
    <button onClick={() => console.log(board)}>Log Board</button>
    <Painter handleSelectChange={handleSelectChange} painter={painter} />
    <Loader defaultBoards={defaultBoards} setBoard={setBoard} />
    <button className='ticker' onClick={() => loopAll(board)}>Tick</button>
    <button className='ticker' onClick={play}>Start Game</button>
    <button className='ticker' onClick={stopTick}>Stop Game</button>
  </div>
)

export default Dev
