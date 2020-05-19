
// import generateBoard from '../components/shooter/Utils/generateBoard'
import defaultBoards from '../components/working/defaultBoards'


const initialState = {
  // board: generateBoard()
  play: {
    board: defaultBoards[0].data
  },
  ui: {
    mouseIsDown: false
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
    },
    entities: [
      { type: 'floor', catt: 'structural' },
      { type: 'wall', variant: 'square', catt: 'structural' },
      { type: 'wall', variant: 'round', catt: 'structural' },
      { type: 'block', variant: 'round', catt: 'structural' },
      { type: 'block', variant: 'soft', catt: 'structural' },
      { type: 'block', variant: 'square', catt: 'structural' },
      { type: 'blackhole', catt: 'obstical' },
      { type: 'marble', direction: 'left', catt: 'obstical' },
      { type: 'rotate', direction: 'clock', catt: 'obstical' },
      { type: 'sentry', direction: 'left', catt: 'obstical' },
      { type: 'shooter', direction: 'left', emits: 'slider', catt: 'obstical' },
      { type: 'slider', direction: 'left', catt: 'obstical' },
      { type: 'timer', time: 6, catt: 'obstical' },
      { type: 'diamond', catt: 'gameplay' },
    ],
    painter: {
      selected: 1,
      focus: {
        x: null,
        y: null
      }
    }
  },
  // def: null
}

export default initialState
