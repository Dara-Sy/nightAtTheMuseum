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
      faves: []
    };
    this.affectMuseumAll = this.affectMuseumAll.bind(this);
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
        <main>
          <Switch>
            <Route
              path="/museum/:museumid"
              render={() => (
                <Museums
                  museumall={this.state.museumAll}
                  changeMuseum={this.affectMuseumAll}
                  favesall={this.state.faves}
                  updateFaves={this.updateFaves}
                  delFaves={this.delFaves}
                />)}
            />
            <Route
              path="/:userid/faves"
              render={() => (
                <UserProfile
                  museumall={this.state.museumAll}
                  changeMuseum={this.affectMuseumAll}
                  favesall={this.state.faves}
                  updateFaves={this.updateFaves}
                  delFaves={this.delFaves}
                />)}
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  museumall={this.state.museumAll}
                  changeMuseum={this.affectMuseumAll}
                  favesall={this.state.faves}
                  updateFaves={this.updateFaves}
                  delFaves={this.delFaves}
                />)}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" />
          </Switch>
        </main>
        <h4>Made by the best DALP you'll ever meet</h4>
      </div>
    );
  }
}
