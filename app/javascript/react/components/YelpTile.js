import React from 'react';
import { Link } from 'react-router'

const YelpTile = props => {

  return(
    <div className="yelp-tile">
      <input type="radio" name="yelpPlacesId" value={props.id} onClick={props.handleClick}/>
      <h3>{props.name}</h3>
      <p>{props.address} | Rating: {props.rating}</p>
      <img src={props.image}/>
    </div>
  )
}

export default YelpTile;
