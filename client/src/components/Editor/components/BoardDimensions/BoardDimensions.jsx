import React from 'react'

import HeightInput from '../HeightInput/'
import WidthInput from '../WidthInput/'

/**
 * A section to change the board dimensions.
 *
 * Renders {@link HeightInput} and {@link WidthInput} in a wrapper.
 * @category Editor
 * @subcategory Components
 * @component
 * @example
 *  return (
 *      <BoardDimensions />
 *  )
 */
const BoardDimensions = () => (
    <div>
        <h4>Board Dimensions</h4>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <HeightInput />
            <WidthInput />
        </div>
    </div>
)

export default BoardDimensions