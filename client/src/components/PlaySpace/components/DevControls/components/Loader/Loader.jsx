import React from 'react'

/**
 * Renders a list of board options as button for the user to select.
 * @param {Object[]} props.boards List of boards to render options for.
 * @param {function} props.setBoard Callback function to select a given board. 
 */
const Loader = ({ boards, setBoard }) => (
    <div>
        {boards.map((each, idx) => (
            <button onClick={() => setBoard(each.data)} key={idx}>
                {idx}
            </button>
        ))}
    </div>
)

export default Loader
