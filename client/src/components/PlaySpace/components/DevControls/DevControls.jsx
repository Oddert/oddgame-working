import React from 'react'

import defaultBoards from '../../../../utils/defaultBoards'

import Loader from './components/Loader'
import Painter from './components/Painter'

/**
 * Renders a series of development controls to test and debug the {@link PlaySpace}.
 * @component
 * @param {Object} props.board The current play-state board.
 * @param {function} props.loopAll Function that increments the game by one step.
 * @param {string} props.painter The current painter brush mode.
 * @param {function} props.play Function to begin the game playing.
 * @param {function} props.setBoard Callback function to update the play-state board.
 * @param {function} props.setPainter Callback function invoked when the painter mode changes.
 * @param {function} props.stopTick Function to stop the game playing.
 */
const DevControls = ({
    board,
    loopAll,
    painter,
    play,
    setBoard,
    setPainter,
    stopTick,
}) => (
    <div>
        <button onClick={() => console.log(board)}>Console Log Board</button>
        <Painter setPainter={setPainter} painter={painter} />
        <Loader boards={defaultBoards} setBoard={setBoard} />
        <button className='ticker' onClick={() => loopAll(board)}>Tick</button>
        <button className='ticker' onClick={play}>Start Game</button>
        <button className='ticker' onClick={stopTick}>Stop Game</button>
    </div>
)

export default DevControls
