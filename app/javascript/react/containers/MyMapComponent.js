import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'
class MyMapComponent extends React.Component {
  constructor(props){
    super(props)
    // this.state={
    //   longZero: this.props.allLongLat["0"]["longitude"],
    //   latZero: this.props.allLongLat["0"]["latitude"],
    //   longOne: this.props.allLongLat["1"]["longitude"],
    //   latOne: this.props.allLongLat["1"]["latitude"],
    //   longTwo: this.props.allLongLat["2"]["longitude"],
    //   latTwo: this.props.allLongLat["2"]["latitude"]
    // }
  }
render() {
  console.log(this.props.allLongLat)
  let origin, destination, waypoint
  let points = []
  if(window.google && this.props.allLongLat["2"]) {
    for(let i = 0; i <= 2; i++) {
      const latLng = this.props.allLongLat[i.toString()]
      if(latLng && latLng.latitude) {
        points.push(new google.maps.LatLng(latLng.latitude, latLng.longitude))
      }
    }
  }
  const DirectionsComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBACD4QaolgZ_C3yoa8CtxyBM5pcN3NEO0",
      loadingElement: <div style={{ height: `400px` }} />,
      containerElement: <div style={{ width: `100%` }} />,
      mapElement: <div style={{height: `1000px`, width: `1000px` }}  />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
        const DirectionsService = new google.maps.DirectionsService();
        if(points.length === 3) {

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
    return (<DirectionsComponent />)
  }
}
export default MyMapComponent
