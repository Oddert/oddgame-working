import React from 'react'
import { convertTextToLevelSet } from '../../../../utils/textEditorUtils'
import { useDispatch } from 'react-redux'
import { filesOpenSet } from '../../../../actions'

const UploadFile = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const reader = new FileReader()
        reader.onload = () => {
            console.log(reader.result)
            if (reader.result) {
                const levelSet = convertTextToLevelSet(
                    reader.result,
                    false,
                    false,
                    file.name.replace(/.txt$/, ''),
                )
                console.log(levelSet)
                if (!levelSet.errors.length) {
                    dispatch(
                        filesOpenSet(levelSet.set, true)
                    )
                }
            }
        }
        console.log(file)
        reader.readAsText(e.target.files[0], 'utf-8')
    }

    return (
        <input type='file' onChange={handleChange} />
    )
}

export default UploadFile
