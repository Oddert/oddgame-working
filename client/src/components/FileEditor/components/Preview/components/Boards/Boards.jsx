import React from 'react'

import Board from '../../../../../Board'

const Boards = ({ boards }) => {
    console.log(boards)
    if (!boards.length) {
        return null
    }
    return (
        boards.map(board => (
            <Board
                // cache
                board={board}
                // focus
                // handleCellClick
                // handleMouseEnter
                // unCache
            />
        ))
    )
}

export default Boards
