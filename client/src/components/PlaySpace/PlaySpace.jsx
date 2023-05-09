import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Board from '../Board/'
import DevControls from './components/DevControls/'

import { playBoardWrite } from '../../actions/'

import handleShoot from '../../utils/moveHandlers/handleShoot'
import handleSliderMove from '../../utils/moveHandlers/handleSliderMove'
import handleMarbleMove from '../../utils/moveHandlers/handleMarbleMove'
import handleSentryMove from '../../utils/moveHandlers/handleSentryMove'
import handleTimer from '../../utils/moveHandlers/handleTimer'

import { ranArr, ranNum } from '../../utils/randomisers'
import { getAnticlockwise } from '../../utils/rotate'

/**
 * Custom hook for looping a function.
 *
 * Runs a function on an interval until `delay` is removed.
 * @param {function} callback The function to be delayed.
 * @param {number} delay The delay in milliseconds.
 */
function useInterval(callback, delay) {
    const cbRef = useRef()

    useEffect(() => {
        cbRef.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => cbRef.current()
        if (delay) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])

}

// eslint-disable-next-line no-unused-vars
const parseHash = ({ y, x, type }) => ({
    x, y, type,
    hash: `${y}_${x}_${type}`,
})

const PlaySpace = () => {
    // BUG: This should be in a useEffect???
    // const [board, setBoard] = React.useState(generateBoard('marble'))
    // const [boarda, setBoard] = React.useState(defaultBoards[1].data)
    const [ painter, setPainter ] = useState('marble')
    const [ tickLength, setTickLength ] = useState(null)

    const dispatch = useDispatch()

    const { board, /*registry,*/ tick } = useSelector(state => state.play)
    const { entityList } = useSelector(state => state.edit)

    function handleCellClick ({ y, x }) {
        const nb = JSON.parse(JSON.stringify(board))
        nb[y][x].type = painter
        if (painter !== 'timer') nb[y][x].direction = 'right'
        switch (painter) {
            case 'rotate':
                nb[y][x].direction = ranArr([ 'clock', 'anticlock' ])
                break;
            case 'timer':
                nb[y][x].time = ranNum(3, 9)
                break;
            case 'block':
                nb[y][x].variant = ranArr([
                    'soft', 'square', 'round', 
                ])
                break;
            case 'shooter':
                nb[y][x].direction = ranArr([
                    'left', 'right', 'up', 'down', 
                ])
                nb[y][x].emits = ranArr([ 'slider', 'marble' ])
                break;
            default:
                break;
        }
        dispatch(playBoardWrite(nb))
    }

    const play = () => {
        setTickLength(1000)
    }

    useInterval(loopAll, tickLength)

    function stopTick() {
        setTickLength(null)
    }

    function loopAll () {
        const start = Date.now()
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
        const nv = JSON.parse(JSON.stringify(board))//board.slice().map(row => row.slice().map(c => c))

        const callstack = []
        // const registeryKeys = Object.keys(registry)

        // const activeEntityList = registeryKeys.reduce((acc, each) => {
        //   return [...acc, ...registry[each]]
        // }, [])

        const activeEntityList = []//[...registry.marble]
        console.log(activeEntityList)

        const createRegisterDynamic = []

        activeEntityList.forEach((entity, listIdx) => {
            // const { r, c } = entity
            //
            // switch(entity.type) {
            //   case 'shooter':
            //     function shootEntity () {
            //       const { direction, emits } = entity
            //       const shoot = handleShoot(r, c, nv, tick, direction, emits)
            //       nv[r][c].direction = getAnticlockwise(nv[r][c].direction)
            //
            //       if (!shoot.status) return
            //       nv[shoot.y][shoot.x] = shoot.data
            //     }
            //     callstack.push(shootEntity)
            //     return
            //   case 'slider':
            //     function moveslider () {
            //       const { direction } = entity
            //       const moved = handleSliderMove(r, c, nv, tick, direction)
            //       // console.log(moved)
            //       if (moved.toBeRemoved) {
            //         // set blackhole to cooldown
            //         // remove from registry
            //         nv[r][c] = entityList.floor()
            //         return
            //       }
            //       const directionUnchanged = !moved.direction || (moved.direction && moved.direction === entity.direction)
            //       const positionUnMoved = moved.y === r && moved.x === c
            //       if (positionUnMoved) {
            //         if (!directionUnchanged) nv[r][c].direction = moved.direction
            //         return
            //       }
            //       // console.log(`swapping ${r}, ${c}, ${board[r][c].direction} to ${moved.y}, ${moved.x}, ${moved.direction}`)
            //       nv[moved.y][moved.x].type = 'slider'
            //       nv[moved.y][moved.x].direction = nv[r][c].direction
            //       if (!positionUnMoved) {
            //         nv[r][c].type = 'floor'
            //         delete nv[r][c].direction
            //       }
            //     }
            //     callstack.push(moveslider)
            //     return
            //   case 'marble':
            //     function moveMarble () {
            //       // BUG: well... potential bug, check screenshot, marble @ 4, 6 not moving
            //       // console.log('baw found')
            //       const { direction, halted } = entity
            //       const moved = handleMarbleMove(r, c, nv, tick, direction, halted)
            //       // console.log(moved, nv[r][c])
            //       if (moved.toBeRemoved) {
            //         nv[r][c] = { type: 'floor' }
            //         return
            //       }
            //
            //       if (moved.halted) nv[r][c].halted = true
            //       else delete nv[r][c].halted
            //       // console.log(r, c, moved)
            //       // console.log(moved.direction && moved.direction !== entity.direction)
            //
            //       if (moved.direction && moved.direction !== entity.direction) {
            //         console.log('direction changed')
            //         nv[moved.y][moved.x].direction = moved.direction
            //         return
            //       }
            //
            //       if (moved.y === r && moved.x === c) return
            //       // console.log({ r, c  }, moved)
            //       if (nv[moved.y] && nv[moved.y][moved.x]) {
            //         // console.log(`swapping ${r}, ${c} to ${moved.y}, ${moved.x}`)
            //         nv[moved.y][moved.x].type = 'marble'
            //         nv[moved.y][moved.x].direction = nv[r][c].direction
            //         nv[r][c].type = 'floor'
            //         delete nv[r][c].direction
            //       }
            //     }
            //     callstack.push(moveMarble)
            //     return
            //   case 'sentry':
            //     function moveSentry () {
            //       const { direction } = entity
            //       const moved = handleSentryMove(r, c, nv, tick, direction)
            //       // console.log(moved)
            //       if (moved.toBeRemoved) {
            //         nv[r][c] = { type: 'floor' }
            //         return
            //       }
            //
            //       const positionUnMoved = moved.y === r && moved.x === c
            //       if (positionUnMoved && moved.direction === entity.direction) return
            //       // console.log(`swapping ${r}, ${c}, ${board[r][c].direction} to ${moved.y}, ${moved.x}, ${moved.direction}`)
            //       nv[moved.y][moved.x].type = 'sentry'
            //       nv[moved.y][moved.x].direction = moved.direction
            //       if (moved.bounce) {
            //         const { target, source } = moved.bounce
            //         nv[target.y][target.x] = { ...nv[source.y][source.x] }
            //         nv[source.y][source.x] = entityList.floor()
            //       }
            //       if (!positionUnMoved) {
            //         nv[r][c].type = 'floor'
            //         delete nv[r][c].direction
            //       }
            //     }
            //     callstack.push(moveSentry)
            //     return
            //   case 'timer':
            //     function tickTock () {
            //       const { time, speed } = entity
            //       const ticked = handleTimer(r, c, nv, tick, time, speed)
            //       if (ticked.toBeRemoved) {
            //         nv[r][c] = { type: 'floor' }
            //         return
            //       }
            //       nv[r][c].time = ticked.time
            //     }
            //     callstack.push(tickTock)
            //     return
            //   default:
            //     return
            // }
        })

        const reg = (r, c, entity) => ({ y: r, x: c, r, c, ...entity })

        board.forEach((row, r) => {
            row.forEach((col, c) => {
                switch(col.type) {
                    case 'shooter':
                        function shootEntity () {
                            const { direction, emits } = col
                            const shoot = handleShoot(r, c, nv, tick, direction, emits)
                            nv[r][c].direction = getAnticlockwise(nv[r][c].direction)

                            createRegisterDynamic.push(reg(r, c, nv[r][c]))
                            if (!shoot.status) return
                            nv[shoot.y][shoot.x] = shoot.data
                            createRegisterDynamic.push(reg(shoot.y, shoot.x, nv[shoot.y][shoot.x]))

                        }
                        callstack.push(shootEntity)
                        return
                    case 'slider':
                        function moveSlider () {
                            const { direction } = col
                            const moved = handleSliderMove(r, c, nv, tick, direction)
                            // console.log(moved)
                            if (moved.toBeRemoved) {
                                // set blackhole to cooldown
                                // remove from registry
                                nv[r][c] = entityList.floor()
                                return
                            }
                            const directionUnchanged = !moved.direction || (moved.direction && moved.direction === col.direction)
                            const positionUnMoved = moved.y === r && moved.x === c

                            if (!directionUnchanged) nv[r][c].direction = moved.direction
                            if (positionUnMoved) {
                                return
                            }
                            // console.log(
                            // 	`swapping ${r}, ${c}, ${board[r][c].direction} to ${moved.y}, ${moved.x}, ${moved.direction}`
                            // )
                            nv[moved.y][moved.x].type = 'slider'
                            nv[moved.y][moved.x].direction = nv[r][c].direction
                            if (!positionUnMoved) {
                                nv[r][c].type = 'floor'
                                delete nv[r][c].direction
                            }
                        }
                        callstack.push(moveSlider)
                        return
                    case 'marble':
                        function moveMarble () {
                            // BUG: well... potential bug, check screenshot, marble @ 4, 6 not moving
                            // console.log('baw found')
                            const { direction, halted } = col
                            const moved = handleMarbleMove(r, c, nv, tick, direction, halted)
                            // console.log(moved, nv[r][c])
                            if (moved.toBeRemoved) {
                                nv[r][c] = { type: 'floor' }
                                return
                            }

                            if (moved.halted) nv[r][c].halted = true
                            else delete nv[r][c].halted
                            // console.log(r, c, moved)
                            // console.log(moved.direction && moved.direction !== col.direction)

                            if (moved.direction && moved.direction !== col.direction) {
                                console.log('direction changed')
                                nv[moved.y][moved.x].direction = moved.direction
                                return
                            }

                            if (moved.y === r && moved.x === c) return
                            // console.log({ r, c  }, moved)
                            if (nv[moved.y] && nv[moved.y][moved.x]) {
                                // console.log(`swapping ${r}, ${c} to ${moved.y}, ${moved.x}`)
                                nv[moved.y][moved.x].type = 'marble'
                                nv[moved.y][moved.x].direction = nv[r][c].direction
                                nv[r][c].type = 'floor'
                                delete nv[r][c].direction
                            }
                        }
                        callstack.push(moveMarble)
                        return
                    case 'sentry':
                        function moveSentry () {
                            const { direction } = col
                            const moved = handleSentryMove(r, c, nv, tick, direction)
                            // console.log(moved)
                            if (moved.toBeRemoved) {
                                nv[r][c] = { type: 'floor' }
                                return
                            }

                            const positionUnMoved = moved.y === r && moved.x === c
                            if (positionUnMoved && moved.direction === col.direction) return
                            // console.log(
                            // 	`swapping ${r}, ${c}, ${board[r][c].direction} to ${moved.y}, ${moved.x}, ${moved.direction}`
                            // )
                            nv[moved.y][moved.x].type = 'sentry'
                            nv[moved.y][moved.x].direction = moved.direction
                            if (moved.bounce) {
                                const { target, source } = moved.bounce
                                nv[target.y][target.x] = { ...nv[source.y][source.x] }
                                nv[source.y][source.x] = entityList.floor()
                            }
                            if (!positionUnMoved) {
                                nv[r][c].type = 'floor'
                                delete nv[r][c].direction
                            }
                        }
                        callstack.push(moveSentry)
                        return
                    case 'timer':
                        function tickTock () {
                            const { time, speed } = col
                            const ticked = handleTimer(r, c, nv, tick, time, speed)
                            if (ticked.toBeRemoved) {
                                nv[r][c] = { type: 'floor' }
                                return
                            }
                            nv[r][c].time = ticked.time
                        }
                        callstack.push(tickTock)
                        return
                    default:
                        return
                }
            })
        })

        callstack.forEach(e => e())

        // console.log(board, nv)
        // setBoard(nv)
        console.log({ createRegisterDynamic })
        dispatch(playBoardWrite(nv))
        const end = Date.now()
        console.log(end - start)
    }

    return (
		<div
            className='Play-Space'
            // style={{ border: '1px dashed orange' }}
            title='components/PlaySpace'
        >
			<Board
				handleCellClick={handleCellClick}
				board={board}
				// cache={() => console.log('BOARD MOUNT')}
			/>
			<DevControls
				board={board}
				setPainter={setPainter}
				painter={painter}
				setBoard={nb => dispatch(playBoardWrite(nb, true, true))}
				loopAll={loopAll}
				play={play}
				stopTick={stopTick}
			/>
		</div>
    )
}

export default PlaySpace
