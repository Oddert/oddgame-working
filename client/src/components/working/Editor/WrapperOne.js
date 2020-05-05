import React from 'react'

import Editor from './EditIndex'

const WrapperOne = props => {
  return (
    <div className='Editor--wrapper one' onClick={e => {e.stopPropagation(); props.close()}}>
      <Editor {...props} />
    </div>
  )
}

export default WrapperOne
