
import React, { useState } from 'react'

import PlaySpace from './PlaySpace'

const Index = () => {
  const [levelEditOpen, setLevelEditOpen] = useState (false)

  const handleToggleEditor = () => setLevelEditOpen(!levelEditOpen)

  return (
    <>
      <button onClick={handleToggleEditor}>New Level +</button>
      <PlaySpace />
      {
        levelEditOpen
          ? 'edit time'
          : ''
      }
    </>
  )
}

export default Index
