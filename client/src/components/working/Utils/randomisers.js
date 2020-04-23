
export const ranArr = arr => arr[Math.floor(Math.random() * arr.length)]

export const ranNum = (min = 0, max = 9) => Math.floor(Math.random() * (max + 1 - min)) + min
