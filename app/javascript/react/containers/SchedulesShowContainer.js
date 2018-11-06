 /* global google */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { push } from 'react-router'
import { browserHistory } from 'react-router'
import LocationTile from '../components/LocationTile'
import MyMapComponent from '../containers/MyMapComponent'
import MapHolder from '../components/MapHolder'

class SchedulesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: {},
      locations: [],
      savedLongLat: {
        0: {longitude: null, latitude: null},
        1: {longitude: null, latitude: null},
        2: {longitude: null, latitude: null}
      }
    }
  }
  componentDidMount() {
    fetch(`/api/v1/schedules/${this.props.params.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(message);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        showInfo:body.schedule,
        locations:body.schedule.locations
      })
      let location = this.state.savedLongLat
      location[0] = {longitude: Number(body.schedule.locations[0].longitude), latitude: Number(body.schedule.locations[0].latitude)}
      location[1] = {longitude: Number(body.schedule.locations[1].longitude), latitude: Number(body.schedule.locations[1].latitude)}
      location[2] = {longitude: Number(body.schedule.locations[2].longitude), latitude: Number(body.schedule.locations[2].latitude)}
      this.setState({ savedLongLat: location })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render(){
    let output;
    let loc;
    let map;

    if(this.state.showInfo) {
      output =
      <div className="showHeader small-12 small-centered medium-4 columns row">
        <h1>Title: {this.state.showInfo.title}</h1>
        <h2>Description: {this.state.showInfo.body}</h2>
      </div>
    }
    if(this.state.locations[0]) {
      loc = this.state.locations.map(place => {
        return(
        <LocationTile
          key={place.id}
          name={place.name}
          address={place.address}
          rating={place.rating}
          state={place.state}
          zipcode={place.zipcode}
          url={place.url}
          description={place.description}
          pricing={place.pricing}
          image={place.image}
        />
      )
      })
    }

    return(
      <div>
        {output}
        {loc}
        {map}
        <MapHolder
          allLongLat={this.state.savedLongLat}
        />
      </div>

    )
  }
}

export default SchedulesShow;
