export const setFilter = (text) => {
    return {
        text,
        type: 'SET_FILTER'
    }
}
export const clearFilter = () => {
    return {
        type: 'CLEAR'
    }
}


const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.text
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export default filterReducer