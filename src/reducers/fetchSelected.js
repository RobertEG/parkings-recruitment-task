export const fetchSelected = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_SELECTED':
            return action.payload;
        default:
            return state
    }
}