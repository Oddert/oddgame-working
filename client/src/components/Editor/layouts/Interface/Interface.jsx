import React from 'react'
import { useDispatch } from 'react-redux'

import { editToggleOpen } from '../../../../actions'

import '../../Editor.scss'

/**
 * @component
 * @example
 *  return (
 *      <Interface board={<Board />} menu={<Menu />} />
 *  )
 */
const Interface = ({ board, menu }) => {
    const dispatch = useDispatch()

    const close = e => {
        e.stopPropagation()
        dispatch(editToggleOpen(true, false))
    }

    return (
        <div className='Editor--wrapper one' onClick={close}>
            <div className='Editor'>
                <div style={{ background: 'tomato', flex: 3, display: 'flex', justifyContent: 'center' }}>
                    {board}
                </div>
                <div style={{ background: 'steelblue', flex: 2 }}>
                    {menu}
                </div>
            </div>
        </div>
    )
}

export default Interface
