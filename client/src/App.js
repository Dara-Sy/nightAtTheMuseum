import React  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from './UserProfile';
import Search from './Search';
import Register from './Register';
import Login from './Login';
import Museums from './Museums';
import './App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      museumAll: [],
      faves: [],
      museumid: '',
      city: '',
      auth: false
    };
    this.affectMuseumAll = this.affectMuseumAll.bind(this);
    this.affectFavesList = this.affectFavesList.bind(this);
    this.sendID = this.sendID.bind(this);
    this.delFaves = this.delFaves.bind(this);
    this.toggleFave = this.toggleFave.bind(this);
  }

  affectMuseumAll(newArray) {
    let array = newArray.slice()
    this.setState({
      museumAll: array,
    })
  }

  affectFavesList(newArray) {
    this.setState({
      faves: newArray,
    })
  }

  sendID(id, city) {
    // if(city === undefined) {
    //   city = '';
    // }
    this.setState({
      museumid: id,
      city: city
    })
  }

  componentWillMount() {
    let token = TokenService.read();
    fetch('/token', {
      body: JSON.stringify({token}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
      .then(payload => {
        if(Object.keys(payload).length === 4) {
          let user_id = payload.user_id;
          this.setState({
            userid: user_id
          })
        } else {
          window.location.replace(`/login`)
        }
      })
    .catch( err => {
      window.location.replace(`/login`)
    })
  }

  toggleFave(data) {
    let theFaves = this.state.faves.slice();
    let exists = false;
    let index = 0;
    theFaves.forEach((d, i) => {
      if(d.museum_id === data.id) {
        exists = true;
        index = i;
      }
    })
    if(exists === true) {
      this.delFaves(theFaves[index].museum_id)
    } else {
      fetch(`/api/${this.state.userid}/faves`, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      .then(response => response.json())
        .then(data => {
          theFaves.push(data);
          this.setState({
            faves: theFaves
          })
        })
    }
  }

  delFaves(museumid) {
    let newFaves = this.state.faves.slice();
    let index = 0;
    newFaves.forEach((d, i) => {
      if(d.museum_id === museumid) {
        index = i;
      }
    })
    let data = newFaves.splice(index, 1)
    fetch(`/api/3/faves`, {
      body: JSON.stringify(data[0]),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then((response) => {
      this.setState({
        faves: newFaves.slice()
      })
    })
  }

  render() {
    return (
      <body>
        <header>
            <h1>Night At The Museum</h1>

            <a className="navlinks" href="/login"> Home </a>
            <a className="navlinks" href="/search"> Search </a>
            <a className="navlinks" href="/:userid/faves"> Profile </a>
            <a className="navlinks" href="/:userid/faves"> Log Out </a>
        </header>
          <Switch>
            <Route
              path="/museum/:museumid"
              render={() => (
                <Museums
                  museumall={this.state.museumAll}
                  changeMuseum={this.affectMuseumAll}
                  favesall={this.state.faves}
                  updateFaves={this.affectFavesList}
                  delFaves={this.delFaves}
                  museumid={this.state.museumid}
                  city={this.state.city}
                />)}
            />
            <Route
              path="/:userid/faves"
              render={() => (
                <UserProfile
                  museumall={this.state.museumAll}
                  changeMuseum={this.affectMuseumAll}
                  favesall={this.state.faves}
                  updateFaves={this.affectFavesList}
                  delFaves={this.delFaves}
                  sendID={this.sendID}
                />)}
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  museumall={this.state.museumAll}
                  changeMuseum={this.affectMuseumAll}
                  favesall={this.state.faves}
                  updateFaves={this.affectFavesList}
                  delFaves={this.delFaves}
                  sendID={this.sendID}
                  toggle={this.toggleFave}
                />)}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
              exact
              path="/"
              render={props => {
                return(
                  <Redirect to="/login" />
                )
              }}
            />
          </Switch>
          <div className="Footer">
            <h4> © Made by the best DALP you'll ever meet</h4>
          </div>
        </body>
    );
  }
}


// <i class="fa fa-car" aria-hidden="true"></i>
// <span class="fa-twitter fa"></span>

// <Route path="/" component={<Redirect to="/login" />} />
