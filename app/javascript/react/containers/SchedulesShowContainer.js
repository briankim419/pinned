import React, { Component } from 'react';

class SchedulesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      let fetchedGenre = body
      this.setState({ genre: fetchedGenre})

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    debugger;
    return(

      <div>
        <h1>Hello</h1>
      </div>

    )
  }
}

export default SchedulesShow;
