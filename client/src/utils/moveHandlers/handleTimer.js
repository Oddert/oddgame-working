/**
 * Computes a Timer entity's next state.
 * @category Utils
 * @subcategory Move Handlers
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} board A copy of the board object.
 * @param {number} tick The current game tick.
 * @param {number} time The timer's current time remaining.
 * @param {number} speed The timer's speed.
 * @returns {{ time: number, toBeRemoved: boolean }}
 */
const handleTimer = (y, x, board, tick, time, speed = 1) => {
    // NOTE: speed ranges from 1 - ∞ and SLOWS the timer
    // 1 = time down every tick, 7 = time down ever 7th tick
    let toBeRemoved = false
    if (time <= 0) toBeRemoved = true
    if (tick % speed) return { time, toBeRemoved }
    return { time: time - 1, toBeRemoved }
}

export default handleTimer
