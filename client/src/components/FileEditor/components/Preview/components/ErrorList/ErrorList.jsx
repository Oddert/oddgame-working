import React from 'react'
import PropTypes from 'prop-types'

const ErrorList = ({ errors }) => {
    if (!errors.length) {
        return null
    }
    return (
        <div>
            <h3>Errors Encountered</h3>
            <ul>
                {
                    errors.map((error, idx) => (
                        <li key={idx}>
                            <span>
                                Line {error.index}: {error.message}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

ErrorList.propTypes = {
    errors: PropTypes.array,
}

ErrorList.default = {
    errors: [],
}

export default ErrorList
