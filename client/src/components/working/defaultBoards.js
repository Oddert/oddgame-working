/* eslint-disable max-len */
const defaultBoards = [
    {
        data: [
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'shooter', direction: 'right', emits: 'marble', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 4, }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', },
            ],
        ],
    },
    {
        data: [
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'diamond', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'block', variant: 'soft', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'block', variant: 'soft', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'block', variant: 'soft', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'marble', direction: 'right', }, { type: 'block', variant: 'soft', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 6, }, { type: 'block', variant: 'soft', }, { type: 'wall', variant: 'round', direction: 4, }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'diamond', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 3, }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'block', variant: 'soft', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 3, }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'diamond', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 3, }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'diamond', }, { type: 'wall', variant: 'square', }, { type: 'magnet', direction: 'vertical', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'wall', variant: 'round', direction: 4, }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 3, }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'floor', }, { type: 'floor', }, { type: 'diamond', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'block', variant: 'soft', }, { type: 'block', variant: 'soft', }, { type: 'block', variant: 'soft', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'floor', }, { type: 'block', variant: 'square', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 1, }, { type: 'wall', variant: 'square', }, { type: 'block', variant: 'soft', }, { type: 'block', variant: 'soft', }, { type: 'block', variant: 'soft', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'round', direction: 6, }, { type: 'block', variant: 'soft', }, { type: 'wall', variant: 'round', direction: 9, }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'marble', direction: 'left', }, { type: 'floor', }, { type: 'floor', }, { type: 'diamond', }, { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'block', variant: 'soft', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'block', variant: 'soft', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'marble', direction: 'down', }, { type: 'marble', direction: 'down', }, { type: 'wall', variant: 'round', direction: 7, }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'block', variant: 'soft', }, { type: 'marble', direction: 'up', }, { type: 'marble', direction: 'up', }, { type: 'block', variant: 'soft', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'marble', direction: 'down', }, { type: 'wall', variant: 'round', direction: 4, }, { type: 'wall', variant: 'round', direction: 3, }, { type: 'block', variant: 'soft', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'block', variant: 'soft', }, { type: 'diamond', }, { type: 'marble', direction: 'up', }, { type: 'block', variant: 'soft', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'block', variant: 'soft', }, { type: 'block', variant: 'soft', }, { type: 'block', variant: 'soft', }, { type: 'diamond', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', },
            ],
        ],
    },
    {
        data: [
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'floor', }, { type: 'wall', variant: 'square', },
            ],
            [
                { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', }, { type: 'wall', variant: 'square', },
            ],
        ],
    },
]

export default defaultBoards
