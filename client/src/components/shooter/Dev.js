import React from 'react'



const Dev = ({ board, setBoard, handleSelectChange, painter }) => {

  const handleChange = e => {
    handleSelectChange(e.target.value)
  }

  return (
    <div>
      <button onClick={() => console.log(board)}>Log Board</button>
      <select onChange={handleChange} value={painter}>
        <option value='floor'>Floor</option>
        <option value='wall'>Wall</option>
        <option value='marble'>Marble</option>
        <option value='slider'>Slider</option>
        <option value='sentry'>Sentry</option>
        <option value='rotate'>Rotate</option>
      </select>
    </div>
  )
}

export default Dev
