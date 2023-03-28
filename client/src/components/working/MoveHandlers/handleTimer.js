
function handleTimer (y, x, board, tick, time, speed = 1) {
    // NOTE: speed ranges from 1 - ∞ and SLOWS the timer
    // 1 = time down every tick, 7 = time down ever 7th tick
    let toBeRemoved = false
    if (time <= 0) toBeRemoved = true
    if (tick % speed) return { time, toBeRemoved, }
    return { time: time - 1, toBeRemoved, }
}

export default handleTimer
