import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { filesOpenSet } from '../../../../../../actions'

const LevelSet = ({ isUserLevels, levels, name }) => {
    const dispatch = useDispatch()

    const handleClick = useCallback((levels) => {
        console.log(name, levels)
        dispatch(filesOpenSet({ name, levels }, isUserLevels))
    }, [
        dispatch, isUserLevels, name, 
    ])

    console.log(isUserLevels, name, levels.map(
        ({ title, hint, finishMessage }) => ({ title, hint, finishMessage })),
    )
    return (
        <button onClick={() => handleClick(levels)}>{name}</button>
    )
    // return (
    //     <div>
    //         <h4>{name}</h4>
    //         <div>
    //             {levels.map((level, idx) => (
    //                 <button
    //                     key={idx}
    //                     onClick={() => handleClick(level)}
    //                 >
    //                         {level.title}
    //                 </button>
    //             ))}
    //         </div>
    //     </div>
    // )
}

export default LevelSet
