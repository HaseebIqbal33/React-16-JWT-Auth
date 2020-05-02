import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Products from './Products.jsx';
import Category from './Category';
import Login, {realAuth} from "./Login";
import Signup from './auth/Signup';
import Home from './Home';
import Admin from './Admin';
class App extends Component {
    render() {
        return ( <div >
                <nav className = "navbar navbar-light" >
                { /*Link components are used for linking to other views*/ } 
                <ul className = "nav justify-content-center" >                 
                    <li className="nav-item"> <Link className="nav-link" to = "/" > Homes </Link> </li>
                    <li className="nav-item"> <Link className="nav-link" to = "/category" >Category </Link> </li>
                    <li className="nav-item"> <Link className="nav-link" to = "/products" >Products </Link> </li>
                    <li className="nav-item"> <Link className="nav-link" to="/admin">Admin area</Link> </li>
                    <li className="nav-item"> <Link className="nav-link" to = "/login" >Login </Link> </li>
                    <li className="nav-item"> <Link className="nav-link" to = "/signup" >Sign Up </Link> </li>
                </ul>
                 < /nav >
                { /*Route components are rendered if the path prop matches the current URL*/ }
                <Switch>
                 <Route path="/login" component={Login} />
                 <Route exact = { true } path = "/" component = { Home } />
                 <Route path = "/category" component = { Category } /> 
                 <Route path = "/products" component = { Products }/> 
                 <Route path = "/signup" component = { Signup } url={"danial" } /> 
                 <PrivateRoute path="/admin" component={Admin} />
                 {/*<PrivateRoute authed={realAuth.isAuthenticated} path='/products' component = {Products} /> */}
                 <Route path = "/:id" render = { () => ( < p > I want this text to show up for all routes other than '/', '/products' and '/category' < /p>)}/ >
                </ Switch> 
                </div>
        );    
    }
}

//Private router function
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        realAuth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )}
    />
  );
};
//Admin component
// const Admin = ({ match }) => {
  
//   return (
//     <div>
//       {" "}
//       <h2>Welcome admin </h2>
//     </div>
//   );
// };


export default App;