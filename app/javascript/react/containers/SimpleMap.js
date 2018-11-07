import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Polyline from '../containers/Polyline'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 42.361145,
      lng: -71.057083,
      map: "",
      maps: ""
    },
    zoom: 11
  };
  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '500px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBACD4QaolgZ_C3yoa8CtxyBM5pcN3NEO0' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.location["0"]["latitude"]}
            lng={this.props.location["0"]["longitude"]}
            text={'A'}
          />
          <AnyReactComponent
            lat={this.props.location["1"]["latitude"]}
            lng={this.props.location["1"]["longitude"]}
            text={'B'}
          />
          <AnyReactComponent
            lat={this.props.location["2"]["latitude"]}
            lng={this.props.location["2"]["longitude"]}
            text={'C'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
