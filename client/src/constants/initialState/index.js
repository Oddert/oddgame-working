
// import generateBoard from '../components/shooter/Utils/generateBoard'
import defaultBoards from '../../utils/defaultBoards'

const entityList = {
    floor: () => ({
        type: 'floor', catt: 'structural',
    }),
    wall_square: () => ({
        type: 'wall', variant: 'square', catt: 'structural',
    }),
    wall_round: (direction = 5) => ({
        type: 'wall', variant: 'round', direction, catt: 'structural',
    }),
    block_round: () => ({
        type: 'block', variant: 'round', catt: 'structural',
    }),
    block_soft: () => ({
        type: 'block', variant: 'soft', catt: 'structural',
    }),
    block_square: () => ({
        type: 'block', variant: 'square', catt: 'structural',
    }),
    blackhole: () => ({
        type: 'blackhole', catt: 'obstacle',
    }),
    marble: (direction = 'left') => ({
        type: 'marble', direction, catt: 'obstacle',
    }),
    rotate: (direction = 'clock') => ({
        type: 'rotate', direction, catt: 'obstacle',
    }),
    sentry: (direction = 'left') => ({
        type: 'sentry', direction, catt: 'obstacle',
    }),
    shooter: (direction = 'right', emits = 'slider') => ({
        type: 'shooter', direction, emits, catt: 'obstacle',
    }),
    slider: (direction = 'left') => ({
        type: 'slider', direction, catt: 'obstacle',
    }),
    timer: (time = 6, speed = 6) => ({
        type: 'timer', time, speed, catt: 'obstacle',
    }),
    diamond: () => ({
        type: 'diamond', catt: 'gameplay',
    }),
    enemy: (variant = 'cloud') => ({
        type: 'enemy', variant, catt: 'gameplay',
    }),
    forcefield: (direction = 'right') => ({
        type: 'forcefield', direction, catt: 'obstacle',
    }),
    magnet: (direction = 'vertical') => ({
        type: 'magnet', direction, catt: 'gameplay',
    }),
    kye: () => ({
        type: 'kye', catt: 'gameplay',
    }),
}

const initialState = {
    // board: generateBoard()
    play: {
        board: defaultBoards[0].data,
        registry: {

        },
        tick: 0,
    },
    ui: {
        mouseIsDown: false,
    },
    edit: {
        open: true,
        lastSave: null,
        lastChange: null,
        save: null,
        data: {
            title: '',
            hint: '',
            board: defaultBoards[1].data,//[[]]
        },
        entityList,
        entities: [
            // { type: 'floor', catt: 'structural' },
            // { type: 'wall', variant: 'square', catt: 'structural' },
            // { type: 'wall', variant: 'round', catt: 'structural' },
            // { type: 'block', variant: 'round', catt: 'structural' },
            // { type: 'block', variant: 'soft', catt: 'structural' },
            // { type: 'block', variant: 'square', catt: 'structural' },
            // { type: 'blackhole', catt: 'obstacle' },
            // { type: 'marble', direction: 'left', catt: 'obstacle' },
            // { type: 'rotate', direction: 'clock', catt: 'obstacle' },
            // { type: 'sentry', direction: 'left', catt: 'obstacle' },
            // { type: 'shooter', direction: 'left', emits: 'slider', catt: 'obstacle' },
            // { type: 'slider', direction: 'left', catt: 'obstacle' },
            // { type: 'timer', time: 6, catt: 'obstacle' },
            // { type: 'diamond', catt: 'gameplay' },
            ...Object.keys(entityList).map(e => entityList[e]()),
        ],
        painter: {
            mode: 'selector',
            selected: 1,
            focus: {
                x: null,
                y: null,
                entity: {
                    type: null,
                },
            },
        },
    },
    // def: null
}

export default initialState
