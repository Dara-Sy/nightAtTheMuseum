import React  from 'react';
import faker  from 'faker';
import Nav    from './Nav';
import Hero   from './Hero';
import Footer from './Footer';
import Bones  from './Bones';
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
