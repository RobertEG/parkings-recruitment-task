export const getFilteredParkings = (parkings, text) => {
    const parkingsSearch = text.toLowerCase();

    return parkings.filter(parking => {
        const { street } = parking.properties;
        return (
            street.toLowerCase().includes(parkingsSearch)
        );
    });
};