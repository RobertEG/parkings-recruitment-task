export const parkings = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_PARKINGS':
            return [
                ...action.parkings
            ]
        case 'REMOVE_PARKING':
            return state.filter(parking => parking !== action.payload)
        case 'EDIT_PARKING':
            return state.map(parking => {
                if(parking === action.parking) {
                    return {
                        ...parking,
                        properties: {
                            ...parking.properties,
                            spots: action.spotsAmount,
                            handicappedSpots: action.handicappedSpotsAmount,
                            paid: action.paidSelected
                        }
                    }
                }
                return parking
            });
        default:
            return state
    }
}