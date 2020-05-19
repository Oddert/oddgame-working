
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  editToggleOpen,
  editWriteBoardNew,
  uiMousedownLow,
  uiMousedownHigh } from '../../actions'

import PlaySpace from './PlaySpace'
import Editor from './Editor/'

const Index = () => {
  const dispatch = useDispatch()

  const { open } = useSelector(state => state.edit)
  const { mouseIsDown } = useSelector(state => state.ui)

  const handleMouseDown = e => {
    if (!mouseIsDown) dispatch(uiMousedownHigh())
    return
  }

  const handleMouseUp = e => {
    if (mouseIsDown) dispatch(uiMousedownLow())
    return
  }

  const newLevel = () => {
    dispatch(editWriteBoardNew())
    dispatch(editToggleOpen())
  }

  return (
    <div className='Index' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <button onClick={newLevel}>New Level +</button>
      <PlaySpace />
      {
        open
          ? <Editor />
          : 'certainly not edit time'
      }
    </div>
  )
}

export default Index
