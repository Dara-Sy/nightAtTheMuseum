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
      city: ''
    };
    this.affectMuseumAll = this.affectMuseumAll.bind(this);
    this.affectFavesList = this.affectFavesList.bind(this);
    this.sendID = this.sendID.bind(this);
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

  delFaves(user) {
    let newFaves = this.state.museum.slice();
    let index = 0;
    newFaves.forEach((d, i) => {
      if(d.museum_id === user.museum_id) {
        index = i;
      }
    })
    let data = newFaves.splice(index, 1)
    fetch(`/${user.user_id}/faves/:faves_id`, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'DELETE',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json())
      .then((response) => {
        this.setState({
          museum: newFaves
        })
      })
  }

  render() {
    return (
      <div>
        <header>
            <h1>Night At The Museum</h1>

            <a className="navlinks" href="/login"> Home </a>
            <a className="navlinks" href="/search"> Search </a>

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
        </div>
    );
  }
}


// <i class="fa fa-car" aria-hidden="true"></i>
// <span class="fa-twitter fa"></span>

// <Route path="/" component={<Redirect to="/login" />} />
