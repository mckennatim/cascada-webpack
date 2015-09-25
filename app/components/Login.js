import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService';


export default class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      apikiey: '',
      username: Auth.data.username,
      email: Auth.data.email
    };
  }

  signup(e) {
    e.preventDefault();
    Auth.getToken(this.state.user, this.state.email, this.state.extra)
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
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
          <input type="email" valueLink={this.linkState('email')} className="form-control" id="email" ref="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="apikey">Apikey</label>
          <input type="text" valueLink={this.linkState('apikey')} className="form-control" id="email" ref="email" placeholder="apikey" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);