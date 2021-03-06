import React from 'react';
import TokenService from './TokenService';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      username: '',
      password: '',
      password2: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitReg = this.submitReg.bind(this);
  }

  handleChange() {
    this.setState({
      fname: this.refs.fname.value,
      lname: this.refs.lname.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      password2: this.refs.password2.value,
    })
  }

  submitReg(e) {
    e.preventDefault();
    if(this.state.password !== this.state.password2) {
      this.refs.dontmatchmsg.innerText = "passwords don't match"
      return null;
    } else {
      this.refs.dontmatchmsg.innerText = '';
      let theData = {...this.state};
      fetch('/register', {
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
          fetch('/token', {
            body: JSON.stringify(token),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
          })
          .then(response => response.json())
            .then(data => {
              window.location.replace(`/${data.user_id}/faves`)
            })
        })
    }
  }

  render(props) {
    return(
      <main className="NavimgReg">
      <div className="boxReg">
          </div>
        <div className="logInContainer">
        <h2>Register</h2>
          <tbody>
            <tr>
              <td>
                <p>First Name &nbsp;&nbsp;&nbsp;</p>
              </td>
              <td>
                <input
                  className="regInput"
                  type="text"
                  placeholder="first name"
                  ref="fname"
                  name="fname"
                  onInput={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Last Name</p>
              </td>
              <td>
                <input
                  className="regInput"
                  type="text"
                  placeholder="last name"
                  ref="lname"
                  name="lname"
                  onInput={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Username</p>
              </td>
              <td>
                <input
                  className="regInput"
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
                  className="regInput"
                  type="password"
                  placeholder="password"
                  ref="password"
                  name="password"
                  onInput={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Confirm</p>
              </td>
              <td>
                <input
                  className="regInput"
                  type="password"
                  placeholder="confirm password"
                  ref="password2"
                  name="password2"
                  onInput={this.handleChange}
                />
              </td>
              <td>
                <p ref="dontmatchmsg"></p>
              </td>
            </tr>
          </tbody>
          <div className="regButton">
            <button
              className="button"
              type="submit"
              onClick={this.submitReg}
            >Submit</button>
          </div>
        </div>
      </main>
    );
  }
}
