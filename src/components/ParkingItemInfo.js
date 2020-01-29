import React from 'react'

export const ParkingItemInfo = ({ spots, hSpots, paid }) => {
    return (
        <div className="ui raised segments" style={{margin: "3px"}}>
            <div className="ui segment spots">Ilość miejsc parkingowych: {spots}</div>
            <div className="ui segment handicappedSpots">Ilość miejsc dla niepełnosprawnych: {hSpots}</div>
            <div className="ui segment paid">{paid}</div>
        </div>
    );
}