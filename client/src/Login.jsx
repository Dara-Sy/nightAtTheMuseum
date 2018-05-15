import React from 'react';
import TokenService from './TokenService';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitReg = this.submitReg.bind(this);
  }

  handleChange() {
    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value,
    })
  }

  submitReg(e) {
    e.preventDefault();
    let theData = this.state;
    fetch(`/login`, {
      body: JSON.stringify(theData),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json())
      .then(token => {
        TokenService.save(token)
        console.log('we have token', token)
        fetch('/token', {
          body: JSON.stringify(token),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        })
        .then(response => response.json())
          .then(data => {
            console.log('thisisreturnedtoken', data)
            window.location.replace(`/${data.user_id}/faves`)
          })
      })
  }

  render(props) {
    return (
      <main className="Navimg">
          <div className="box">
          </div>
        <div className="logInContainer">
        <h2> Welcome! Sign in here: </h2>
            <tbody>
              <tr>
                <td>
                  <p>Username &nbsp;&nbsp;&nbsp;</p>
                </td>
                <td>
                  <input
                    className="reginput"
                    type="text"
                    placeholder="username"
                    ref="username"
                    name="username"
                    onInput={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p>Password</p>
                </td>
                <td>
                  <input
                    className="reginput"
                    type="password"
                    placeholder="password"
                    ref="password"
                    name="password"
                    onInput={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
            <div className="logInButton">
              <button
                className="button"
                type="submit"
                onClick={this.submitReg}
              >Submit</button>
            </div>
            <p>Not a Member? &nbsp;&nbsp;
            <a href="/register" className="smallLink">Sign Up Here! </a>
            </p>
          </div>

      </main>
    );
  }
}
