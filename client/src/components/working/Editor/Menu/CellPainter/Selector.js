import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editChangePainterSelect } from '../../../../../actions'
import { getCell } from '../../../Utils/entityCellCreator'

const Selector = () => {
    const entities = useSelector(state => state.edit.entities)
    const selected = useSelector(state => state.edit.painter.selected)

    const dispatch = useDispatch()

    const cellWrapper = (cell, selected) => (
        <button
            key={`${cell.type}_${cell.variant || cell.emits || cell.direction || 'default'}`}
            className={`col ${cell.type} ${selected === cell.idx ? 'selected' : ''}`}
            title={`${cell.type}_${cell.variant || cell.emits || cell.direction || 'default'}`}
            onClick={() => select(selected, cell.idx)}
        >
            {
                getCell(cell)
            }
        </button>
    )


    const cattegories = entities.reduce((acc, each, idx) => {
        if (!acc.hasOwnProperty(each.catt)) console.error('No such key on accumulator, Selector.js pre-render', { acc, each })
        each.idx = idx
        acc[each.catt].ent.push(each)
        return acc
    }, {
        structural: { displayName: 'Structural', ent: [] },
        obstical: { displayName: 'Obsticals', ent: [] },
        gameplay: { displayName: 'Gameplay', ent: [] }
    })

    const select = (selected, idx) => {
        if (selected !== idx) dispatch(editChangePainterSelect(idx))
    }

    return (
        <div className='Selector'>
            {
                Object.keys(cattegories).map((catt, c_i) =>
                    <div key={`catt_${c_i}`}>
                        <h5 className='Selector__cattegory--title'>{ cattegories[catt].displayName }</h5>
                        <div className='Selector__cattegory'>
                            {
                                cattegories[catt].ent.map(entity => cellWrapper(entity, selected))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Selector
