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
        if (e.target.classList.contains('Editor--wrapper')) {
            dispatch(editToggleOpen(true, false))
        }
    }

    return (
        <div className='Editor--wrapper one' onClick={close}>
            <div className='Editor' onClick={e => e.preventDefault()}>
                <div className='Editor__panel board'>
                    {board}
                </div>
                <div className='Editor__panel menu'>
                    {menu}
                </div>
            </div>
        </div>
    )
}

export default Interface
