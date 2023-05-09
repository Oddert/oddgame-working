const reducerFilter = type => {
    const types = [
        'edit', 'file', 'levels', 'play', 'ui',
    ]

    const processedTypes = types
        .filter(e => type ? e !== type.toLowerCase() : true)
        .map(e => `^${e.toUpperCase()}`)
        .join('|')

    const out = new RegExp(`^@@|${processedTypes}`)
    return out
}

export default reducerFilter
