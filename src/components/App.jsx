import React  from 'react';

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
        <h1>Hello Good Sir!</h1>
        <Register />
      </div>
    );
  }
}
