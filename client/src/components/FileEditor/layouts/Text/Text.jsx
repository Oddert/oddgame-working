import React from 'react'

import TextBody from '../../components/TextBody/TextBody'
import Title from '../../components/Title/Title'

const Text = () => {
    return (
        <div className='FileEditor__text'>
            <label htmlFor='FileEditor__title'>Title</label>
            <Title />
            <label htmlFor='FileEditor__body'>File</label>
            <TextBody />
        </div>
    )
}

export default Text
