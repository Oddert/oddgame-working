import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editChangeCell } from '../../../actions'

import Board from '../Board/'
import Menu from './Menu/'

import './index.scss'

const Editor = () => {
  const dispatch = useDispatch()

  const board = useSelector(state => state.edit.data.board)
  const entities = useSelector(state => state.edit.entities)
  const selected = useSelector(state => state.edit.painter.selected)

  const changeCell = ({ y, x }) => {
    console.log(entities[selected])
    dispatch(editChangeCell(y, x, entities[selected]))
  }

  console.log(board)

  return (
    <div className='Editor' onClick={e => {e.stopPropagation();}}>
      <div style={{ background: 'tomato', flex: 3, display: 'flex', justifyContent: 'center' }}>
        <Board board={board} changeCell={changeCell} debug={true} />
      </div>
      <div style={{ background: 'steelblue', flex: 2 }}>
        <Menu />
      </div>
    </div>
  )
}


export default Editor
