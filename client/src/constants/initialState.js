
// import generateBoard from '../components/shooter/Utils/generateBoard'
import defaultBoards from '../components/working/defaultBoards'


const initialState = {
  // board: generateBoard()
  play: {
    board: defaultBoards[0].data
  },
  edit: {
    open: true,
    lastSave: null,
    lastChange: null,
    save: null,
    data: {
      title: '',
      hint: '',
      board: defaultBoards[0].data//[[]]
    }
  },
  // def: null
}

export default initialState
