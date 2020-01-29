import React from 'react';
import { connect } from 'react-redux';
import { searchParkings } from "../actions";

class ParkingsFilter extends React.Component {
    render() {
        return (
            <div className="ui large icon input" style={{margin: "10px 0px 0px 10px"}}>
                <input 
                    type="text"
                    placeholder="Szukaj parkingu"
                    value={this.props.parkingsSearch}
                    onChange={this.handleSearchChange}
                />
                <i className="search icon"></i>
            </div>
        );
    }

    handleSearchChange = e => {
        this.props.searchParkings(e.currentTarget.value);
    }
}

const mapStateToProps = state => {
    return {
        parkingsSearch: state.parkingsSearch
    }
}

const mapDispatchToProps = { searchParkings }

export const ParkingsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(ParkingsFilter);