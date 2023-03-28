import React from 'react'

import CellAttributes from '../CellAttributes/'
import Selector from './Selector'

const CellPainter = () => {
    return (
        <>
            <hr />
            <h4>Cell Painter</h4>
            <Selector />
            <CellAttributes />
        </>
    )
}

export default CellPainter
