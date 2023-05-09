import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders a button allowing the user to download a text file.
 * @category Components
 * @param {string} props.buttonText Text to be displayed inside the button.
 * @param {string} props.data Contents of the text file.
 * @param {boolean} props.disabled If true, the button is disabled.
 * @param {string} props.fileName The name the .txt file will have once downloaded. '.txt' prefix will be added automatically.
 * @param {string} props.title HTML title prop to be applied to the button.
 */
const DownloadTextFile = ({ buttonText, data, disabled, fileName, title }) => {
    const handleClick = () => {
        const element = document.createElement('a')
        const file = new Blob([data], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `${fileName}.txt`
        document.body.appendChild(element) // Required for this to work in FireFox
        element.click()
        element.remove()
    }

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            title={title}
        >
            {buttonText}
        </button>
    )
}

DownloadTextFile.propTypes = {
    buttonText: PropTypes.string,
    data: PropTypes.string,
    disabled: PropTypes.bool,
    fileName: PropTypes.string,
    title: PropTypes.string,
}

DownloadTextFile.defaultProps = {
    buttonText: 'Download Text File',
    data: '',
    disabled: false,
    fileName: 'download',
    title: 'click to download',
}

export default DownloadTextFile
