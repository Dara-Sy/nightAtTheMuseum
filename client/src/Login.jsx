import React from 'react';

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
  }

  render(props) {
    return (
      <div className="logInContainer">
        <tbody>
          <tr>
            <td>
              <p>Username</p>
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
      </div>
    );
  }
}
