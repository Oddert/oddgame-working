import React from 'react'
import { useSelector } from 'react-redux'

import Board from '../Board/'
import RowCol from './RowCol'

import './index.scss'

const Editor = () => {
  const board = useSelector(state => state.edit.data.board)

  return (
    <div className='Editor' onClick={e => {e.stopPropagation();}}>
      <div style={{ background: 'tomato', flex: 3, display: 'flex', justifyContent: 'center' }}>
        <Board board={board} />
      </div>
      <div style={{ background: 'steelblue', flex: 2 }}>
        <h3>Edit Tools</h3>
        <hr />
        <h4>Game Details</h4>
        <p>Title Change</p>
        <p>Hint Change</p>
        <hr />
        <h4>Board Dimensions</h4>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <RowCol orientation={'height'} />
          <RowCol orientation={'width'} />
        </div>
        <hr />
        <h4>Cells</h4>
        <p>Array Selector</p>
        <p>Attribute(s)</p>

      </div>
    </div>
  )
}


export default Editor
