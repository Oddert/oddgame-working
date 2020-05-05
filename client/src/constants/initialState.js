
// import generateBoard from '../components/shooter/Utils/generateBoard'
import defaultBoards from '../components/working/defaultBoards'


const initialState = {
  // board: generateBoard()
  play: {
    board: defaultBoards[0].data
  },
  edit: {
    open: true
  },
  // def: null
}

export default initialState
