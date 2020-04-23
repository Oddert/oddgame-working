
function handleTimer (y, x, board, time) {
  let toBeRemoved = false
  if (time <= 0) toBeRemoved = true
  return { time: time - 1, toBeRemoved }
}

export default handleTimer
