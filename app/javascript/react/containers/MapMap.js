import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'
import MapMap from '../containers/DirectionsComponent'

class MapMap extends React.Component {
  constructor(props){
    super(props)
    this.state={
      long: null,
      lat: null
    }
  }
render() {

return (
      <div>
        <DirectionsComponent />
      </div>
    )
  }
}
export default MapMap
