import { LEVEL_SEGMENT, LINE_OF_WALLS } from '../constants/regexConstants'

/**
 * Converts an object-based level set to the KYE file format.
 * @param {object} levelSet The level set to be converted.
 * @returns {string}
 */
export const convertLevelSetToText = (levelSet) => {
    const length = `${levelSet.levels.length}`
    const levels = levelSet.levels.reduce((acc, level) => {
        return `${acc}\n${level.title}\n${level.hint}\n${level.finishMessage}\n${level.level}`
    }, '')
    return `${length}${levels}`
}

export const convertTextToLevelSet = (text, debugMode, immediate, name) => {
    /**
     * Tracks the state of the read.
     *  - start: The loop has not begun. The first line is the length of the level set.
     *  - title: The next line is the title.
     *  - hint: The next line is the hint.
     *  - finish: The next line is the finish message.
     *  - readNew: Begin the read of a new level; the next line if the fist line in a level.
     *  - read: Read in the current line to the open level set, check if the line is final, if so set to 'title'.
     * @type {'start'|'title'|'hint'|'finish'|'readNew'|'read'}
    */
    let status = 'start'

    /**
     * Object to track the entire 'file'.
     */
    const set = {
        length: 0,
        levels: [],
        name,
    }

    /**
     * tracks the current level being scanned in.
     */
    const openLevel = {
        title: null,
        hint: null,
        finishMessage: null,
        level: '',
    }

    /**
     * Contains the list of current level segments being scanned in.
     * @type {string[]}
     */
    let openLevelSegments = []

    /**
     * Tracks the width of the board currently being scanned in.
     *
     * Used for the validation logic.
     * @type {number}
     */
    let levelWidth = 0;
    
    /**
     * Tracks errors encountered in validation.
     * @type {object[]}
     */
    const errors = []

    /**
     * Splits the text level into an array of lines.
     *
     * Lines are then looped over to perform the validation.
     * @type {string[]}
     */
    const split = text.split(/\r|\n/)

    split.forEach((section, sectionIdx) => {
        switch(status) {
            case 'start':
                set.length = section
                status = 'title'
                break
            case 'title':
                openLevel.title = section
                status = 'hint'
                break
            case 'hint':
                openLevel.hint = section
                status = 'finish'
                break
            case 'finish':
                openLevel.finishMessage = section
                status = 'readNew'
                break
            case 'readNew':
                openLevelSegments = [section]
                levelWidth = section.length
                if (!LINE_OF_WALLS.test(section)) {
                    errors.push({
                        message: 'Level does not begin with a complete line of walls.',
                        index: sectionIdx,
                        validLevels: set.levels.length,
                        setLength: set.length,
                        openLevel: {
                            ...openLevel,
                        },
                        text,
                    })
                    if (immediate) {
                        return errors
                    }
                }
                status = 'read'
                break
            case 'read':
                if (section.length !== levelWidth) {
                    errors.push({
                        message: 'Level segment does not match level width',
                        index: sectionIdx,
                        validLevels: set.levels.length,
                        setLength: set.length,
                        openLevel: {
                            ...openLevel,
                        },
                        text,
                    })
                    if (immediate) {
                        return errors
                    }
                }
                openLevelSegments.push(section)
                if (LINE_OF_WALLS.test(section)) {
                    openLevel.level = openLevelSegments.join('\n')
                    set.levels.push({ ...openLevel })
                    openLevel.title = null
                    openLevel.hint = null
                    openLevel.finishMessage = null
                    openLevel.level = ''
                    status = 'title'
                }
                if (!LEVEL_SEGMENT.test(section)) {
                    errors.push({
                        // eslint-disable-next-line max-len
                        message: 'Level segment is not valid. Level segments must begin and end with a wall and only contain legal entity codes.',
                        index: sectionIdx,
                        validLevels: set.levels.length,
                        setLength: set.length,
                        openLevel: {
                            ...openLevel,
                        },
                        text,
                    })
                }
                break
            default:
                console.error('invalid value in switch')
        }
    })
    if (debugMode) {
        return errors
    }
    return { set, errors, text }
}

export const mapUserLevelsToMenu = (userLevels) => {
    const keys = Object.keys(userLevels)
    return keys.map(key => ({
        name: key,
        levels: convertTextToLevelSet(userLevels[key]).set.levels,
    }))
}
