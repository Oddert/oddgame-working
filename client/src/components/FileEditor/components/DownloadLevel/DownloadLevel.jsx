import React from 'react'
import { useSelector } from 'react-redux'

import DownloadTextFile from '../../../DownloadTextFile/'

const DownloadLevel = () => {
    const text = useSelector(state => state.files.text)
    const name = useSelector(state => state.files.name)

    const disabled = !text.length || !name.length
    return (
        <DownloadTextFile
            buttonText='Download this file'
            data={text}
            disabled={disabled}
            fileName={`${name}.KYE`}
            title={
                disabled
                    ? 'Files require a title and body before saving or downloading'
                    : 'Download the current file'
            }
        />
    )
}

export default DownloadLevel
