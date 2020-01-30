import React from 'react';
import * as parkingi from "../parkingi.js";
import { connect } from 'react-redux';
import { parkingsFetched } from '../actions';
import { getFilteredParkings } from '../selectors/getFilteredParkings';
import { ParkingsFilterContainer } from './ParkingsFilter';
import ParkingsList from './ParkingsList';
import ParkingsMap from './ParkingsMap.js';

import './style/App.css';

export class App extends React.Component {
    componentDidMount() {
        this.props.parkingsFetched(parkingi.default.features);
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui grid">
                    <div className="six wide column">
                        <div className="parking-list">
                            <ParkingsList parkings={this.props.parkings} />
                        </div>
                    </div>
                    <div className="ten wide column">
                        <ParkingsFilterContainer />
                        <ParkingsMap />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      parkings: getFilteredParkings(state.parkings, state.parkingsSearch)
    };
  };
  
const mapDispatchToProps = { parkingsFetched };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);