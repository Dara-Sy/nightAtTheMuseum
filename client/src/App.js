import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';
import Search from './Search';
import Register from './Register';
import Login from './Login';
import Museums from './Museums';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      museumAll: [],
      faves: [],
      museumid: '',
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

  sendID(id) {
    console.log('thisisSendID: ', id)
    this.setState({
      museumid: id
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
        <div className="Nav">
            <h1>Night At The Museum</h1>

            <a className="navlinks" href="/login"> Home </a>
            <a className="navlinks" href="/search"> Search </a>

        </div>
          <main>
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
              <Route path="/" />
            </Switch>
          </main>


          <div className="Navimg"> </div>

          <div className="Footer">
            <h4> © Made by the best DALP you'll ever meet</h4>
          </div>
        </div>
    );
  }
}
