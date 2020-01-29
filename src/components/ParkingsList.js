import React from 'react';
import { ParkingItemInfo } from './ParkingItemInfo';
import { connect } from 'react-redux';
import { fetchSelected, fetchOnMouseOver, removeParking, editParking } from '../actions';

import './style/ParkingList.css'

export function checkPaid(val) {
    if (val === true) return "Płatny";
    
    return "Bezpłatny";
}

export class ParkingsList extends React.Component {
    constructor() {
        super();
   
        this.state = {
          editClicked: false,
          clickedParkingID: [],
          currentVal: null,
          paidSelected: false
        };
   
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.paidSelectionChanged = this.paidSelectionChanged.bind(this);
    }

    paidSelectionChanged(changeEvent) {
        this.setState({
            paidSelected: changeEvent.target.value
        });
    }
   
    handleClickEdit(id) {
        this.setState({
            editClicked: true,
            clickedParkingID: id,
        });
    }

    handleClickSave(id, parking) {
        this.setState({
            editClicked: false,
            clickedParkingID: id
        });
        const paidValue = (this.state.paidSelected === 'true' || this.state.paidSelected === true);
        this.props.editParking(parking, this.refs.numParkings.value, this.refs.handicappedSpotsAmount.value, paidValue);
    }

    parkingToParkingItem = parking => {
        const street = parking.properties.street;
        const spots = parking.properties.spots;
        const hSpots = parking.properties.handicappedSpots;
        const paid = checkPaid(parking.properties.paid);

        return (
            <div key={parking.geometry.coordinates} className="item" style={{maxWidth: "30vw"}}>
                <div onClick={() => this.props.fetchSelected(parking)} onMouseOver={() => this.props.fetchOnMouseOver(parking)} onMouseOut={() => this.props.fetchOnMouseOver(false)} className="ui block grey inverted header">
                    Ulica {street}
                </div>
                {this.state.editClicked && this.state.clickedParkingID === parking.geometry.coordinates ? (
                    <div>
                        <div className="ui raised segments" style={{margin: "3px"}}>
                            <div className="ui form field segment spots">
                                <input type="number" ref="numParkings" defaultValue={spots} min="0" placeholder="Ilość miejsc parkingowych"/>
                            </div>
                            <div className="ui form field segment handicappedSpots">
                                <input type="number" ref="handicappedSpotsAmount" defaultValue={hSpots} min="0" placeholder="Ilość miejsc dla niepełnosprawnych"/>
                            </div>
                            <div className="ui form field segment paid">
                                <div className="inline fields" onChange={this.paidSelectionChanged}>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="paid" id="platny" defaultChecked={this.state.paidSelected === true || this.state.paidSelected === 'true'} value={true}/>
                                            <label htmlFor="platny">Płatny</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="paid" id="bezplatny" defaultChecked={this.state.paidSelected === false || this.state.paidSelected === 'false'} value={false}/>
                                            <label htmlFor="bezplatny">Bezpłatny</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right floated content">
                            <div className="ui tiny yellow button" onClick={() => this.handleClickSave(parking.geometry.coordinates, parking)}>Zapisz</div>
                            <div 
                                className="ui tiny brown button"
                                onClick={() => this.props.removeParking(parking)}
                            >Usuń</div>
                        </div>
                    </div>
                    ) : (
                    <div>
                        <div onClick={() => this.props.fetchSelected(parking)} onMouseOver={() => this.props.fetchOnMouseOver(parking)} onMouseOut={() => this.props.fetchOnMouseOver(false)}>
                            <ParkingItemInfo
                                spots={spots}
                                hSpots={hSpots}
                                paid={paid}
                            />
                        </div>
                        <div className="right floated content">
                            <div 
                                className="ui tiny orange button" 
                                onClick={() => this.handleClickEdit(parking.geometry.coordinates)}>
                                Edytuj
                            </div>
                            <div 
                                className="ui tiny brown button"
                                onClick={() => this.props.removeParking(parking)}>
                                Usuń
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <div className="ui relaxed divided list selection">
                {this.props.parkings.map(this.parkingToParkingItem)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { fetchSelected: state.fetchSelected,
             fetchOnMouseOver: state.fetchOnMouseOver,
             removeParkings: state.removeParkings, 
             editParking: state.editParking};
}

const mapDispatchToProps = { fetchOnMouseOver, fetchSelected, removeParking, editParking }

export default connect(mapStateToProps, mapDispatchToProps)(ParkingsList);