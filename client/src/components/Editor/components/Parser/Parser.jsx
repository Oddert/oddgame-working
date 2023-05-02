import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import readLevelFromText from '../../../../utils/readLevelFromText'

import { editWriteBoard, playBoardWrite } from '../../../../actions'

import levels from '../../../../constants/standardLevels'

const levelsArray = Object.values(levels)

const Parser = () => {
    const dispatch = useDispatch()
    const { data: { board } } = useSelector(state => state.edit)

    const [ levelInput, setLevelInput ] = useState('')
    const [ selectedPreset, setSelectedPreset ] = useState({
        ...levelsArray[0],
        index: 0,
    })
    
    // const lazy = 11
    // const t = levels[`l_${lazy}`].data

    const send = () => {
        dispatch(editWriteBoard(readLevelFromText(selectedPreset.data)))
    }

    const submitInput = () => {
        dispatch(editWriteBoard(readLevelFromText(levelInput)))
    }

    const handleSelectChange = (e) => {
        const index = e.target.value
        console.log(index)
        setSelectedPreset({
            ...levelsArray[index],
            index,
        })
    }

    return (
        <>
            <textarea value={levelInput} onChange={e => setLevelInput(e.target.value)} />
            <button onClick={submitInput}>Read Input</button>
            <button onClick={() => readLevelFromText(levelInput)}>
                Console log user input
            </button>
            <hr />
            <select onChange={handleSelectChange}>
                {levelsArray.map((level, idx) => (
                    <option key={idx} value={idx}>{level.title}</option>
                ))}
            </select>
            <button onClick={send}>
                Print me level: {selectedPreset.index} - {selectedPreset.title}
            </button>
            <button onClick={() => readLevelFromText(selectedPreset.data)}>
                Console Show me the thing
            </button>
            <hr />
            <button onClick={() => dispatch(playBoardWrite(board, true, true))}>
                put on real board (crime)
            </button>
        </>
    )
}

export default Parser
