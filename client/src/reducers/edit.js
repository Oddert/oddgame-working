
import types from '../actions/types'
import initialState from '../constants/initialState'
import reducerFilter from '../constants/reducerFilter'

import defaultBoards from '../components/working/defaultBoards'

const edit = (state = initialState.edit, action) => {
  const { payload, type } = action

  switch(type) {
    case types.EDIT_TOGGLE_OPEN: return toggleOpen(state, payload)
    case types.EDIT_WRITE_BOARD_NEW: return writeBoardNew(state, payload)
    case types.EDIT_WRITE_ROW: return writeRow(state, payload)
    case types.EDIT_WRITE_COL: return writeCol(state, payload)
    case types.EDIT_WRITE_ROWS_DIRECT: return writeRowsDirect(state, payload)
    default:
      if (!type.match(reducerFilter('edit'))) {
        console.warn(`[edit reducer]: default route taken in switch for type: ${type}`, { state, action })
      }
      return state
  }
}

// IDEA: name conflict, consider resolve
function toggleOpen (state, payload) {
  const { open } = state
  const { value, override } = payload
  // IDEA: Patterns like this one should type check?
  if (open === undefined) return Object.assign({}, state, {
    open: false
  })
  return Object.assign({}, state, {
    open: override ? !!value : !open
  })
}

function writeBoardNew (state, payload) {
  const { save } = payload
  return Object.assign({}, state, {
    lastChange: Date.now(),
    save,
    title: 'New Game',
    data: Object.assign({}, state.data, {
      board: defaultBoards[2].data//[[]]
    })
  })
}

const blankRow = len => {
  const row = [{ type: 'wall', variant: 'square' }]
  for (let i=2; i<len; i++) row.push({ type: 'floor' })
  row.push({ type: 'wall', variant: 'square' })
  return row
}

function writeRow (state, payload) {
  const { inc } = payload
  const board = JSON.parse(JSON.stringify(state.data.board))

  if (inc) board.splice(board.length-1, 0, blankRow(board[0].length))
  else board.splice(board.length-2, 1)

  return Object.assign({}, state, {
    data: Object.assign({}, state.data, {
      board
    })
  })
}

function writeCol (state, payload) {
  const { inc } = payload
  const board = JSON.parse(JSON.stringify(state.data.board))

  board.forEach((row, i) => {
    if (inc) {
      const insert = (i === 0 || i === board.length - 1) ? { type: 'wall', variant: 'square' } : { type: 'floor' }
      row.splice(row.length-2, 0, insert)
    } else {
      row.splice(row.length-2, 1)
    }
  })

  return Object.assign({}, state, {
    data: Object.assign({}, state.data, {
      board
    })
  })
}

function writeRowsDirect (state, payload) {
  const prevLen = state.data.board.length
  const { value } = payload
  const lenDiff = Math.abs(prevLen - value)
  const board = JSON.parse(JSON.stringify(state.data.board))

  if (value === prevLen) return state
  if (value < prevLen) board.splice(board.length - 1 - lenDiff, lenDiff)
  if (value > prevLen) {
    const newRows = []
    for (let i=0; i<lenDiff; i++) newRows.push(blankRow(board[0].length))
    board.splice(board.length - 1, 0, ...newRows)
  }

  console.log(board)
  return Object.assign({}, state, {
    data: Object.assign({}, state.data, {
      board
    })
  })
}

export default edit
