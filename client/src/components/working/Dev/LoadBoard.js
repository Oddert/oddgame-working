import React from 'react'

const LoadBoard = ({ board, setBoard, idx }) => {
    return (
        <button onClick={() => setBoard(board)}>{ idx }</button>
    )
}

export default LoadBoard
