
import React, { useState } from 'react'

import PlaySpace from './PlaySpace'
import Editor from './Editor/'

const Index = () => {
  const [levelEditOpen, setLevelEditOpen] = useState (true)

  const handleToggleEditor = () => setLevelEditOpen(!levelEditOpen)

  return (
    <>
      <button onClick={handleToggleEditor}>New Level +</button>
      <PlaySpace />
      {
        levelEditOpen
          ? <Editor close={handleToggleEditor} />
          : 'certainly not edit time'
      }
    </>
  )
}

export default Index
