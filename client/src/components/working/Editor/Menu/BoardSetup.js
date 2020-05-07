import React from 'react'

import RowCol from '../Rowcol'

const BoardSetup = () => {
  return (
    <>
      <hr />
      <h4>Board Dimensions</h4>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <RowCol orientation={'height'} />
        <RowCol orientation={'width'} />
      </div>
    </>
  )
}

export default BoardSetup
