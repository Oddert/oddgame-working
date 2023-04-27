import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { editChangePainterSelect } from '../../../../actions'
import { getCell } from '../../../working/Utils/entityCellCreator'

/**
 * Allows the user to select an entity for the painter.
 * @category Editor
 * @subcategory Components
 * @component
 * @example
 *  return (
 *      <EntitySelector />
 *  )
 */
const EntitySelector = () => {
    const entities = useSelector(state => state.edit.entities)
    const selected = useSelector(state => state.edit.painter.selected)

    const dispatch = useDispatch()

    const select = useCallback((selected, idx) => {
        if (selected !== idx) {
            dispatch(editChangePainterSelect(idx))
        }
    }, [dispatch])

    const cellWrapper = (cell) => {
        console.log(cell)
        const key = `${cell.type}_${cell.variant || cell.emits || cell.direction || 'default'}`
        return (
            <div
                key={key}
                className='Selector__option'
            >
                <button
                    className={
                        classnames(
                            'col',
                            cell.type,
                            selected === cell.idx ? 'selected' : null
                        )
                    }
                    onClick={() => select(selected, cell.idx)}
                    title={key}
                >
                    {
                        getCell(cell)
                    }
                </button>
                <label className='Selector__option__label'>
                    {cell.type}<br />
                    {cell.variant ? ` ${cell.variant}` : null}
                </label>
            </div>
        )
    }

    const categories = useMemo(() => entities.reduce((acc, each, idx) => {
        if (!acc.hasOwnProperty(each.catt)) {
            console.error('No such key on accumulator, Selector.js pre-render', { acc, each })
        }
        each.idx = idx
        acc[each.catt].ent.push(each)
        return acc
    }, {
        structural: { displayName: 'Structural', ent: [] },
        obstacle: { displayName: 'Obstacles', ent: [] },
        gameplay: { displayName: 'Gameplay', ent: [] },
    }), [entities])

    return (
        <div className='Selector'>
            {
                Object.keys(categories).map((catt, c_i) =>
                    <div key={`catt_${c_i}`}>
                        <h5 className='Selector__category--title'>{ categories[catt].displayName }</h5>
                        <div className='Selector__category'>
                            {
                                categories[catt].ent.map(cell => cellWrapper(cell))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default EntitySelector
