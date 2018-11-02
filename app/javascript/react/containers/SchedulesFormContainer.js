import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { push } from 'react-router'
import { browserHistory } from 'react-router'
import YelpTile from '../components/YelpTile'
import SimpleMap from '../containers/SimpleMap'

class SchedulesFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data1: [],
      x: [],
      title: "",
      description: "",
      location: "",
      a: "",
      b: "",
      c: "",
      searchString: '',
      place_id: '',
      placeIdOne: '',
      placeIdTwo: '',
      placeIdThree: '',
      yelpPlacesId: [],
      base_data: [],
      savedID: {}
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveID = this.saveID.bind(this);
  }

  saveID(id, index){
    let ids = this.state.savedID
    ids[index] = id
    this.setState({ savedID: ids});
  }

  handleChange(event){
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
  event.preventDefault();
  let formPayload = {
  title: this.state.title,
  body: this.state.description,
  savedID: this.state.savedID
  };
  fetch(`/api/v1/schedules`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(formPayload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      credentials: 'same-origin'}
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
      throw(error);
    }
  })
  .then(response => response.json())
  .then(body => {
    browserHistory.push(`/`)
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  searchYelp(event) {
    event.preventDefault();

    fetch(`/api/v1/yelp?term=${this.state.a}&location=${this.state.location}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ data: this.state.data.concat(body) });
    if(this.state.b){
    fetch(`/api/v1/yelp?term=${this.state.b}&location=${this.state.location}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ data: this.state.data.concat(body) });

    if(this.state.c){
    fetch(`/api/v1/yelp?term=${this.state.c}&location=${this.state.location}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ data: this.state.data.concat(body) });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    let a,b,c;
    let yelp_data = [];
    if(this.state.data.length > 0){
      this.state.data.forEach((yelp_response, idx) => {
        let temp = [];
        yelp_response.data.forEach(yelp => {
        let handleClick = (event) => {
            let value = event.target.value
            this.saveID(value, idx)
            this.props.handleLongLat(idx ,yelp.longitude, yelp.latitude)
          }
          temp.push(
          <YelpTile
            key={yelp.yelp_id}
            id={yelp.yelp_id}
            name={yelp.name}
            address={yelp.display_address}
            rating={yelp.rating}
            image={yelp.image}
            longitude={yelp.longitude}
            latitude={yelp.latitude}
            handleClick={handleClick}
          />)
        });
        yelp_data.push(temp);
      });
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            name = 'title'
            type = 'text'
            value = {this.state.title}
            onChange = {this.handleChange}
          />
          <label>Description</label>
          <input
            name = 'description'
            type = 'text'
            value = {this.state.description}
            onChange = {this.handleChange}
          />
        <div className = "yelp submission">
          <label>City</label>
          <input
            name = 'location'
            type = 'text'
            value = {this.state.location}
            onChange = {this.handleChange}
          />
          <label>A - Activity</label>
          <input
            name = 'a'
            type = 'text'
            value = {this.state.a}
            onChange = {this.handleChange}
            placeholder = 'What activity would you like to do?'
          />
        <div>
              <label>Yelp Radio</label>
              <form>{yelp_data[0]}</form>
            </div>
            <label>B - Activity</label>
            <input
              name = 'b'
              type = 'text'
              value = {this.state.b}
              onChange = {this.handleChange}
              placeholder = 'What activity would you like to do?'
            />
          <div>
            <label>Yelp Radio</label>
            <form>{yelp_data[1]}</form>
          </div>
          <label>C - Activity</label>
          <input
            name = 'c'
            type = 'text'
            value = {this.state.c}
            onChange = {this.handleChange}
            placeholder = 'What activity would you like to do?'
          />
        <div>
          <label>Yelp Radio</label>
            <form>{yelp_data[2]}</form>
        </div>
        </div>
          <label>Search</label>
          <input type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} />
          <button onClick = {this.searchYelp}>Yelp</button>
          <input className="button" type="submit" value="Submit" />
          </form>

        <div className="yelp-tile">
          <h3>Ogawa Coffee</h3>
          <p>Address: 10 Milk St | Rating: 4.5</p>
          <img src="https://s3-media4.fl.yelpcdn.com/bphoto/Zbk3dY_gLAJ0pelu9ehojQ/o.jpg"/>
        </div>
        <div className="yelp-tile">
          <h3>Ogawa Coffee</h3>
          <p>Address: 10 Milk St | Rating: 4.5</p>
          <img src="https://s3-media4.fl.yelpcdn.com/bphoto/Zbk3dY_gLAJ0pelu9ehojQ/o.jpg"/>
        </div>
    </div>
    )
  }
}

export default SchedulesFormContainer;
