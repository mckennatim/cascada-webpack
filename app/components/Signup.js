import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService'
import authData from '../services/AuthData'

export default class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      email: ''
    };
  }

  signup(e) {
    e.preventDefault();
    console.log(authData.dog)
    authData.signup();
    var udata = Auth.signup(this.state.user, this.state.email);
    console.log(udata.udata)
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Signup</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" valueLink={this.linkState('email')} className="form-control" id="email" ref="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);