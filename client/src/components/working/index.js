
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editToggleOpen } from '../../actions'

import PlaySpace from './PlaySpace'
import Editor from './Editor/'

const Index = () => {
  const open = useSelector(state => state.edit.open)
  const dispatch = useDispatch()

  const toggle = () => dispatch(editToggleOpen())

  return (
    <>
      <button onClick={toggle}>New Level +</button>
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
