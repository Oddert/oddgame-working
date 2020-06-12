import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editPainterModeSwitch } from '../../../../actions'

const Cursor = () => {
  const dispatch = useDispatch()
  const { mode } = useSelector(state => state.edit.painter)

  const modes = ['selector', 'brush']

  const handleChange = m => dispatch(editPainterModeSwitch(m))

  return (
    <form>
      {
        modes.map(each =>
          <label key={each}>
            <input
              type='radio'
              value={each}
              checked={mode === each}
              onChange={() => handleChange(each)}
            />
            { each }
          </label>
        )
      }
    </form>
  )
}

export default Cursor
