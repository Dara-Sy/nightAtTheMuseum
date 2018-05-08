import React  from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from './Register'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route path='/:userid/faves/:favesid' />
            <Route path='/:userid/faves' />
            <Route path='/search' />
            <Route path='/register' component={Register} />
            <Route path='/' />
          </Switch>
        </main>
        <h1>Hello Good Sir!</h1>
        <Register />
      </div>
    );
  }
}
