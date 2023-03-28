import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'

import { getCell } from '../Utils/entityCellCreator'

import '../index.scss'

const Board = ({ board, handleCellClick, focus, handleMouseEnter, cache }) => {

    function handleClick (e, y, x) {
        e.preventDefault()
        handleCellClick({ y, x })
    }

    const focused = (y, x) => {
        if (focus && focus.x && focus.y) {
            return focus.x === x && focus.y === y ? 'focused' : ''
        } else return ''
    }

    useEffect(() => {
        if (cache) {
            cache()
        }
        return () => console.log('BOARD UNMOUNT')
    }, [cache])

    const mouseDidEnter = (e, y, x) => {
        if (handleMouseEnter) handleMouseEnter(e, y, x)
    }

    const cellWrapper = (cell, y, x) => (
        <div
            key={`${y}_${x}`}
            className={`col ${cell.type} ${cell.variant || 'default'} ${focused(y, x)}`}
            onMouseDown={e => handleClick(e, y, x)}
            title={`${y}_${x} ${cell.info || cell.type}`}
            onMouseEnter={e => mouseDidEnter(e, y, x)}
        >
            {
                getCell(cell)
            }
        </div>
    )

    function generateRows () {
        const cols = []
        for (let c=0; c<board.length; c++) {
            const rows = []
            for (let r=0; r<board[0].length; r++) {
                const cell = board[c][r]
                rows.push(cellWrapper(cell, c, r))
            }
            cols.push(<div key={c} className='row'>{rows}</div>)
        }
        return cols
    }

    return (
        <div className='Board' >
            <div>{ generateRows() }</div>
        </div>
    )
}

export default Board
