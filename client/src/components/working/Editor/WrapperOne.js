import React from 'react'
import { useDispatch } from 'react-redux'

import { editToggleOpen } from '../../../actions'

import Editor from './EditIndex'

const WrapperOne = props => {
  const dispatch = useDispatch()

  const close = e => {
    e.stopPropagation()
    dispatch(editToggleOpen(true, false))
  }

  return (
    <div className='Editor--wrapper one' onClick={close}>
      <Editor {...props} />
    </div>
  )
}

export default WrapperOne
