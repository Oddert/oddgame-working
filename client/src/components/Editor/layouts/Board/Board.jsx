import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    editChangeCell,
    editPainterFocusUpdate,
} from '../../../../actions'

import BoardWrapper from '../../../Board'

/**
 * Wraps the component/Board component.
 *
 * Provides the user the ability to write using the painter state.
 * @component
 * @example
 *  return (
 *      <Board />
 *  )
 */
const Board = () => {
    const dispatch = useDispatch()

    const { board } = useSelector(state => state.edit.data)
    const {
        entities,
        painter: {
            mode,
            selected,
            focus,
        },
    } = useSelector(state => state.edit)
    const { mouseIsDown } = useSelector(state => state.ui)

    const handleCellClick = ({ y, x }) => {
        if (mode === 'brush') dispatch(editChangeCell(y, x, entities[selected]))
        else if (mode === 'selector') dispatch(editPainterFocusUpdate(y, x))
    }

    const handleMouseEnter = (e, y, x) => {
        if (mouseIsDown && mode === 'brush') dispatch(editChangeCell(y, x, entities[selected]))
    }

    return (
        <BoardWrapper
            board={board}
            focus={focus}
            handleCellClick={handleCellClick}
            handleMouseEnter={handleMouseEnter} 
        />
    )
}

export default Board