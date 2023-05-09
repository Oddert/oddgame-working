import React from 'react'

import TextBody from '../../components/TextBody/TextBody'
import Title from '../../components/Title/Title'
import DownloadLevel from '../../components/DownloadLevel/DownloadLevel'
import SaveButton from '../../components/SaveButton/SaveButton'

const Text = () => {
    return (
        <div className='FileEditor__text'>
            <div className='FileEditor__bar'>
                <DownloadLevel />
                <SaveButton />
            </div>
            <label htmlFor='FileEditor__title'>Title</label>
            <Title />
            <label htmlFor='FileEditor__body'>File</label>
            <TextBody />
        </div>
    )
}

export default Text
