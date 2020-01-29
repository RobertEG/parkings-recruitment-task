export const parkingsSearch = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_PARKINGS':
            return action.text;
        default:
            return state
    }
}