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

export default entityList
