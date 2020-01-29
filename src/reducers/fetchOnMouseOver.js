export const fetchOnMouseOver = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_ON_MOUSE_OVER':
            return action.payload;
        default:
            return state
    }
}