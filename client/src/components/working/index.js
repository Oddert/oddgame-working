
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editToggleOpen, editWriteBoardNew } from '../../actions'

import PlaySpace from './PlaySpace'
import Editor from './Editor/'

const Index = () => {
  const open = useSelector(state => state.edit.open)
  const dispatch = useDispatch()

  const newLevel = () => {
    dispatch(editWriteBoardNew())
    dispatch(editToggleOpen())
  }

  return (
    <>
      <button onClick={newLevel}>New Level +</button>
      <PlaySpace />
      {
        open
          ? <Editor />
          : 'certainly not edit time'
      }
    </>
  )
}

export default Index
