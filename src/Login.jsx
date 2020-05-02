import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      email: '',
      password: '',
      error: ''
    }
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    realAuth.authenticate((e) => {
      if(e) {
        this.setState({ redirectToReferrer: true })
      } else {
        this.setState({
          error: 'Invalid Credentials.'
        })
      }
      
    }, this.state)
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return(<div className="container">
            <div className="row justify-content-md-center">
                <div className="col-sm-4">
                    <h2> Login </h2>
                    { (this.state.error !== '') ?
                    <div className="alert alert-danger" role="alert">
                        { this.state.error }
                    </div> : ''
                    }
                    <form onSubmit={this.login} >
                        <div className="form-group">
                            <label>Email address :</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password :</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
  }


}

/* A fake authentication function */

export const realAuth = {
  isAuthenticated: false,
  
  authenticate(cb, state) {
    axios.post('http://localhost:3001/auth/login', {email: state.email, password: state.password})
    .then(response => {
      console.log(response);
      // JWT Token
      localStorage.setItem('auth_token', response.data.auth_token);
      axios.defaults.headers.common['Authorization'] = response.data.auth_token;
      // JWT Token End
      this.isAuthenticated = true;
      cb(true);
    }).catch(error => {
        if (error.response) {
            this.isAuthenticated = false;
            cb(false);
            // JWT Token
            localStorage.setItem('auth_token', '');
            axios.defaults.headers.common['Authorization'] = '';
            // JWT Token End
            console.log(error.response);
        }
    })
  }
}

export default Login