import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editChangeCell } from '../../../actions'

import Board from '../Board/'
import Menu from './Menu/'

import './index.scss'

const Editor = () => {
  const dispatch = useDispatch()

  const { board } = useSelector(state => state.edit.data)
  const {
    entities,
    painter: {
      selected,
      focus
    }
  } = useSelector(state => state.edit)
  const { mouseIsDown } = useSelector(state => state.ui)

  const changeCell = ({ y, x }) => dispatch(editChangeCell(y, x, entities[selected]))

  const handleMouseEnter = (e, y, x) => {
    if (mouseIsDown) dispatch(editChangeCell(y, x, entities[selected]))
  }

  return (
    <div className='Editor' onClick={e => {e.stopPropagation()}}>
      <div style={{ background: 'tomato', flex: 3, display: 'flex', justifyContent: 'center' }}>
        <Board board={board} changeCell={changeCell} focus={focus} handleMouseEnter={handleMouseEnter} />
      </div>
      <div style={{ background: 'steelblue', flex: 2 }}>
        <Menu />
      </div>
    </div>
  )
}


export default Editor
