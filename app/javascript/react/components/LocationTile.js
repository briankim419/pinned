import React from 'react';
import { Link } from 'react-router'

const LocationTile = props => {
  return(
    <div className="small-4 columns location">
      <h1>{props.name}</h1>
      <h2>{props.description}</h2>
      <h4>{props.address}</h4>
      <img src={props.image}/>
      <h4>{props.url}</h4>
      <h4>{props.rating}</h4>
      <h4>{props.pricing}</h4>
    </div>
  )
}

export default LocationTile;
