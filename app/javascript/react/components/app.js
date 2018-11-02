import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import SchedulesFormContainer from '../containers/SchedulesFormContainer';
import SimpleMap from '../containers/SimpleMap';
import SchedulesContainer from '../containers/SchedulesContainer';
import SchedulesShowContainer from '../containers/SchedulesShowContainer';

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={SchedulesContainer} />
      <Route path='/schedules/:id' component={SchedulesShowContainer} />
    </Router>
  );
}


export default App
