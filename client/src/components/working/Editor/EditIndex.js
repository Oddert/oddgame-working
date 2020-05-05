import React from 'react'
import Board from '../Board/'

import './index.scss'

const Editor = () => {
  return (
    <div className='Editor' onClick={e => {e.stopPropagation();}}>
      <div style={{ background: 'tomato', flex: 3 }}>
        {/* <Board /> */}
      </div>
      <div style={{ background: 'steelblue', flex: 1 }}>edit tools</div>
    </div>
  )
}


export default Editor
