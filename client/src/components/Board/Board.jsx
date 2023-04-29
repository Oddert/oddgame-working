import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'

import { getCell } from '../../utils/entityCellCreator'

import '../working/index.scss'

/**
 * Renders a board.
 *
 * Configurable to work for game-play or editing purposes.
 * @component
 * @param {function} props.cache Function called on the board mounts.
 * @param {Object[][]} props.board The board data to be rendered.
 * @param {{ x: number, y: number}} props.focus Object containing coordinates of the currently focused cell.
 * @param {function} props.handleCellClick Callback function invoked when a cell is clicked.
 * @param {function} props.handleMouseEnter Callback function invoked when the user hovers over a cell.
 * @param {function} props.unCache Function called on the board un-mounts.
 */
const Board = ({
    cache,
    board,
    focus,
    handleCellClick,
    handleMouseEnter,
    unCache,
}) => {

    const handleClick = useCallback((e, y, x) => {
        e.preventDefault()
        handleCellClick({ y, x })
    }, [handleCellClick])

    const generateRows = useMemo(() => {
        const isFocused = (y, x) => {
            if (focus && focus.x && focus.y) {
                return focus.x === x && focus.y === y ? 'focused' : ''
            }
            return ''
        }

        const mouseDidEnter = (e, y, x) => {
            if (handleMouseEnter) {
                handleMouseEnter(e, y, x)
            }
        }

        const createTitle = (y, x, cell) => {
            return `${y}_${x} ${cell.info || cell.type}`
        }

        const createClassName = (y, x, cell) => {
            return `col ${cell.type} ${cell.variant || 'default'} ${isFocused(y, x)}`
        }

        const cellWrapper = (cell, y, x) => {
            return (
                <div
                    key={`${y}_${x}`}
                    className={createClassName(y, x, cell)}
                    onMouseDown={e => handleClick(e, y, x)}
                    title={createTitle(y, x, cell)}
                    onMouseEnter={e => mouseDidEnter(e, y, x)}
                >
                    {
                        getCell(cell)
                    }
                </div>
            )
        }

        const cols = []
        
        for (let c = 0; c < board.length; c++) {
            const rows = []
            for (let r = 0; r < board[0].length; r++) {
                const cell = board[c][r]
                rows.push(cellWrapper(cell, c, r))
            }
            cols.push(<div key={c} className='row'>{rows}</div>)
        }

        return cols
    }, [
        board, focus, handleMouseEnter, handleClick,  
    ])

    useEffect(() => {
        if (cache) {
            cache()
        }
        return () => {
            if (unCache) {
                unCache()
            }
        }
    }, [ cache, unCache ])

    return (
        <div
            className='Board'
            // style={{ border: '1px dashed limegreen' }}
            title='components/Board'
        >
            {generateRows}
        </div>
    )
}

Board.propTypes = {
    cache: PropTypes.func,
    board: PropTypes.arrayOf(PropTypes.array),
    focus: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    handleCellClick: PropTypes.func,
    handleMouseEnter: PropTypes.func,
    unCache: PropTypes.func,
}

Board.defaultProps = {
    cache: () => {},
    board: [[]],
    focus: { x: 0, y: 0 },
    handleCellClick: () => {},
    handleMouseEnter: () => {},
    unCache: () => {},
}

export default Board
