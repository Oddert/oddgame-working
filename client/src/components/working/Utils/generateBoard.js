
import { ranArr } from './randomisers'

const generateBoard = (sliderEmits) => {
    const out = []
    for (let row = 0; row < 10; row++) {
        const r = []
        for (let col = 0; col < 10; col++) {
            const cell = { type: 'floor' }
            if (row === 0 || row === 9) cell.type = 'wall'
            if (col === 0 || col === 9) cell.type = 'wall'
            r.push(cell)
        }
        out.push(r)
    }

    const getWall = () => {
        const r = Math.floor(Math.random()*8) + 1
        const c = Math.floor(Math.random()*8) + 1
        if (out[r][c].type !== 'floor') getWall()
        else out[r][c].type = 'wall'
    }

    for (let i=0; i<5; i++) getWall()

    // const getShooter = emits => {
    //   const sliderR = Math.floor(Math.random()*8) + 1
    //   const sliderC = Math.floor(Math.random()*8) + 1
    //   if (out[sliderR][sliderC].type !== 'floor') return getShooter(emits)
    //   else {
    //     out[sliderR][sliderC].type = 'shooter'
    //     out[sliderR][sliderC].direction = 'right'
    //     out[sliderR][sliderC].emits = emits
    //   }
    // }

    const getRotate = direction => {
        const sliderR = Math.floor(Math.random()*8) + 1
        const sliderC = Math.floor(Math.random()*8) + 1
        if (out[sliderR][sliderC].type !== 'floor') return getRotate(direction)
        else {
            out[sliderR][sliderC].type = 'rotate'
            out[sliderR][sliderC].direction = direction
        }
    }

    // for (let i=0; i<3; i++) getShooter(sliderEmits)
    for (let i=0; i<3; i++) getRotate(ranArr(['clock', 'anticlock']))

    console.log({ initBoard: out })
    return out
}

export default generateBoard
