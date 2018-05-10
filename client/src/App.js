import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './Search';
import Register from './Register';
import Login from './Login';
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
            <Route path="/:userid/faves/:favesid" />
            <Route path="/:userid/faves" />
            <Route path="/search" component={Search} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" />
          </Switch>
        </main>
        <h1>Hello Good Sir!</h1>
      </div>
    );
  }
}
