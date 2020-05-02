import React,{ Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class Signup extends Component {
    constructor(props) {
        super(props);
        var formData = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        };
        this.state = formData;
        this.state.redirect = false;
        this.userSignUp = this.userSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    userSignUp = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/signup', this.state)
            .then(response => {
                this.setState({
                    redirect: true
                });
                // this.context.router.push({
                //     pathname: '/',
                //     state: {email: this.state.email}  
                // });
                console.log(response);
            }).catch(error => {
                if (error.response) {
                    this.setState = this.formData;
                    console.log(error.response);
                }
            })
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            // passing params in redirect
            return <Redirect to={{pathname: '/', state: {message: 'Sign Up successfull.'}}} />
        }
        return(<div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-sm-6">
                        <h2> Create New Account </h2>
                        <form onSubmit={this.userSignUp} >
                            <div className="form-group">
                                <label>Name :</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email address :</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Password :</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter Password" value={this.state.password_digest} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password :</label>
                                <input type="password" className="form-control" name="password_confirmation" placeholder="Enter Confirm Password" value={this.state.confirm_password_digest} onChange={this.handleChange} />
                            </div>
                            <button className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}
export default Signup;
