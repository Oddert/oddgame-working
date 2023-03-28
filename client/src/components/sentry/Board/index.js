import React from 'react'

import '../index.scss'

import sentry_left from '../../../resources/sentry_left.svg'
import sentry_right from '../../../resources/sentry_right.svg'
import sentry_up from '../../../resources/sentry_up.svg'
import sentry_down from '../../../resources/sentry_down.svg'


const Board = ({ board, loopAll, changeCell, }) => {

    const imgs = {
        sentry_left,
        sentry_right,
        sentry_up,
        sentry_down,
    }

    function generateRows () {
        const cols = []
        for (let c = 0; c < board.length; c++) {
            const rows = []
            for (let r = 0; r < board[0].length; r++) {
                rows.push(
                    <div key={r} className={`col ${board[c][r].type}`} onContextMenu={e => {
                        e.preventDefault()
                        changeCell({ y: c, x: r, })
                    }}>
                        {
                            board[c][r].type === 'sentry'
                                ? (
									<img
										className='sentry__img'
										src={imgs[`sentry_${board[c][r].direction}`]}
										alt={`sentry ${board[c][r].direction}`}
									/>
                                )
                                : ''
                        }
                    </div>
                )
            }
            cols.push(<div key={c} className='row'>{rows}</div>)
        }
        return cols
    }

    return (
        <div className='Board' onClick={loopAll}>
            <div>{ generateRows() }</div>
        </div>
    )
}

export default Board
