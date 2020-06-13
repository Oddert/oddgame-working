
// import generateBoard from '../components/shooter/Utils/generateBoard'
import defaultBoards from '../components/working/defaultBoards'

const entity_list = {
  floor: () => ({
    type: 'floor', catt: 'structural'
  }),
  wall_square: () => ({
    type: 'wall', variant: 'square', catt: 'structural'
  }),
  wall_round: (direction = 5) => ({
    type: 'wall', variant: 'round', direction, catt: 'structural'
  }),
  block_round: () => ({
    type: 'block', variant: 'round', catt: 'structural'
  }),
  block_soft: () => ({
    type: 'block', variant: 'soft', catt: 'structural'
  }),
  block_square: () => ({
    type: 'block', variant: 'square', catt: 'structural'
  }),
  blackhole: () => ({
    type: 'blackhole', catt: 'obstical'
  }),
  marble: (direction = 'left') => ({
    type: 'marble', direction, catt: 'obstical'
  }),
  rotate: (direction = 'clock') => ({
    type: 'rotate', direction, catt: 'obstical'
  }),
  sentry: (direction = 'left') => ({
    type: 'sentry', direction, catt: 'obstical'
  }),
  shooter: (direction = 'right', emits = 'slider') => ({
    type: 'shooter', direction, emits, catt: 'obstical'
  }),
  slider: (direction = 'left') => ({
    type: 'slider', direction, catt: 'obstical'
  }),
  timer: (time = 6) => ({
    type: 'timer', time, catt: 'obstical'
  }),
  diamond: () => ({
    type: 'diamond', catt: 'gameplay'
  }),
  enemy: (variant = 'cloud') => ({
    type: 'enemy', variant, catt: 'gameplay'
  }),
  forcefield: (direction = 'right') => ({
    type: 'forcefield', direction, catt: 'obstical'
  }),
  magnet: (direction = "vertical") => ({
    type: 'magnet', direction, catt: 'gameplay',
  }),
  kye: () => ({
    type: 'kye', catt: 'gameplay'
  }),
}

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
      board: defaultBoards[1].data//[[]]
    },
    entity_list,
    entities: [
      // { type: 'floor', catt: 'structural' },
      // { type: 'wall', variant: 'square', catt: 'structural' },
      // { type: 'wall', variant: 'round', catt: 'structural' },
      // { type: 'block', variant: 'round', catt: 'structural' },
      // { type: 'block', variant: 'soft', catt: 'structural' },
      // { type: 'block', variant: 'square', catt: 'structural' },
      // { type: 'blackhole', catt: 'obstical' },
      // { type: 'marble', direction: 'left', catt: 'obstical' },
      // { type: 'rotate', direction: 'clock', catt: 'obstical' },
      // { type: 'sentry', direction: 'left', catt: 'obstical' },
      // { type: 'shooter', direction: 'left', emits: 'slider', catt: 'obstical' },
      // { type: 'slider', direction: 'left', catt: 'obstical' },
      // { type: 'timer', time: 6, catt: 'obstical' },
      // { type: 'diamond', catt: 'gameplay' },
      ...Object.keys(entity_list).map(e => entity_list[e]())
    ],
    painter: {
      mode: 'selector',
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
