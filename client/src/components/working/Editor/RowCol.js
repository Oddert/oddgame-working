import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editWriteRow, editWriteCol, editWriteRowsDirect, editWriteColsDirect } from '../../../actions'

const RowCol = ({ orientation }) => {
  const dispatch = useDispatch()
  const board = useSelector(state => state.edit.data.board)

  // OPTIMIZE: Component imports action creators for both height and width but will only ever use one set
  const incdec = inc => {
    if (orientation === 'width') dispatch(editWriteCol(inc))
    else dispatch(editWriteRow(inc))
  }

  // OPTIMIZE: Make this use koos and await user enter key (also allow intenable values (e.g 0))
  const directSet = e => {
    const { value } = e.target
    if (value < 3) return
    if (orientation === 'width') return dispatch(editWriteColsDirect(value))
    else dispatch(editWriteRowsDirect(value))
  }

  const style = {
    flexDirection: orientation === 'width' ? 'row-reverse' : 'column',
    alignItems: orientation === 'width' ? 'center' : 'stretch'
  }

  return (
    <div className='Rowcol' style={style}>
      <button
        onClick={() => incdec(true)}
      >
        +
      </button>
      <input
        type='number'
        value={orientation === 'height' ? board.length : board[0].length}
        onChange={directSet}
      />
      <button
        onClick={() => incdec(false)}
      >
        -
      </button>
    </div>
  )
}

export default RowCol
