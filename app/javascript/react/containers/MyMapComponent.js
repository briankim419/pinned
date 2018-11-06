 /* global google */
import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'

class MyMapComponent extends React.Component {
  constructor(props){
    super(props)
  }
render() {
  console.log(this.props.allLongLat);
  console.log(window.google);


  let origin, destination, waypoint
  let points = []

  console.log(points[0]);

  if(window.google && this.props.allLongLat["2"].latitude !== null ) {
    for(let i = 0; i <= 2; i++) {
      const latLng = this.props.allLongLat[i.toString()]
      if(latLng && latLng.latitude) {
        points.push(new google.maps.LatLng(latLng.latitude, latLng.longitude))
      }
    }
  }

  // style={{ width: `100%` }}
  // style={{height: `1000px`, width: `1000px` }}
  const DirectionsComponent = compose(
    withProps({
      loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div className="columns small-centered small-12 medium-6 columns"  style={{ height: `100%` }} />,
    }),
    // withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
        if(points.length === 3) {
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: points[0],
            destination: points[2],
            waypoints: [{location: points[1], stopover: true}],
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: {...result},
                markers: true
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });

        }

      }
    })
    )(props =>
      <GoogleMap defaultZoom={13} defaultCenter={{ lat: 42.361145, lng: -71.057083}}>
        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
      </GoogleMap>
    );
    return (
      <div className="row columns small-8 small-centered map">
        <DirectionsComponent />
      </div>
    )
  }
}
export default MyMapComponent
