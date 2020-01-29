export const parkingsFetched = parkings => ({
    type: 'FETCH_PARKINGS',
    parkings
});

export const fetchSelected = parking => ({
    type: 'FETCH_SELECTED',
    payload: parking
});

export const fetchOnMouseOver = parking => ({
    type: 'FETCH_ON_MOUSE_OVER',
    payload: parking
});

export const searchParkings = text => ({
    type: 'SEARCH_PARKINGS',
    text
});

export const removeParking = parking => ({
    type: 'REMOVE_PARKING',
    payload: parking
});

export const editParking = (parking, spotsAmount, handicappedSpotsAmount, paidSelected) => ({
    type: 'EDIT_PARKING',
    parking,
    spotsAmount,
    handicappedSpotsAmount,
    paidSelected
});