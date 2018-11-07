import React from 'react';
import { Link } from 'react-router'
import MyMapComponent from '../containers/MyMapComponent'

const MapHolder = props => {
  return(
    <div>
      <MyMapComponent
        allLongLat={props.allLongLat}
      />
    </div>
  )
}

export default MapHolder;
