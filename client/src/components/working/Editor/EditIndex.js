import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editChangeCell, editPainterFocusUpdate } from '../../../actions'

import Board from '../Board/'
import Menu from './Menu/'

import './index.scss'

const Editor = () => {
  const dispatch = useDispatch()

  const { board } = useSelector(state => state.edit.data)
  const {
    entities,
    painter: {
      mode,
      selected,
      focus
    }
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
    <div className='Editor' onClick={e => {e.stopPropagation()}}>
      <div style={{ background: 'tomato', flex: 3, display: 'flex', justifyContent: 'center' }}>
        <Board
          board={board}
          focus={focus}
          handleCellClick={handleCellClick}
          handleMouseEnter={handleMouseEnter} 
        />
      </div>
      <div style={{ background: 'steelblue', flex: 2 }}>
        <Menu />
      </div>
    </div>
  )
}


export default Editor
