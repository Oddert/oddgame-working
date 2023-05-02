
// import generateBoard from '../components/shooter/Utils/generateBoard'
import defaultBoards from '../../utils/defaultBoards'

import entityList from '../entityList'

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
