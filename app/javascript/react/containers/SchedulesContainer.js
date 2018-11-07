import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { push } from 'react-router'
import { browserHistory } from 'react-router'
import MyMapComponent from '../containers/MyMapComponent'
import SchedulesFormContainer from '../containers/SchedulesFormContainer';

class SchedulesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedLongLat: {
        0: {longitude: null, latitude: null},
        1: {longitude: null, latitude: null},
        2: {longitude: null, latitude: null}
      }
    };
    this.handleLongLat = this.handleLongLat.bind(this);
  }
  handleLongLat (index, long, lat) {
    let location = this.state.savedLongLat
    location[index] = {longitude: long, latitude: lat}
    this.setState({ savedLongLat:location })
  }
  render() {
    return (
      <div className="row allForm columns">
          <MyMapComponent
            allLongLat = {this.state.savedLongLat}
            />
          <SchedulesFormContainer
            handleLongLat = {this.handleLongLat}
           />
      </div>
    )
  }
}

export default SchedulesContainer;
