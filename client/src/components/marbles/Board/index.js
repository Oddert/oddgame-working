import React from 'react'

import '../style/index.scss'

import marble_left from '../../../resources/marble_left.svg'
import marble_right from '../../../resources/marble_right.svg'
import marble_up from '../../../resources/marble_up.svg'
import marble_down from '../../../resources/marble_down.svg'


const Board = ({ board, loopAll, changeCell }) => {

    const imgs = {
        marble_left,
        marble_right,
        marble_up,
        marble_down,
    }

    function generateRows () {
        const cols = []
        for (let c = 0; c < board.length; c++) {
            const rows = []
            for (let r = 0; r < board[0].length; r++) {
                rows.push(
                    <div key={r} className={`col ${board[c][r].type}`} onContextMenu={e => {
                        e.preventDefault()
                        changeCell({ y: c, x: r })
                    }}>
                        {
                            board[c][r].type === 'ball'
                                ? (
									<img
										className='marble__img'
										src={imgs[`marble_${board[c][r].direction}`]}
										alt={`marble ${board[c][r].direction}`}
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
