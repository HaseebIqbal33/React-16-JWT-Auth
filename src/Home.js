import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { message } = this.props.location.state || '';
        return (
            <div>
                <h2>Home { message }</h2>
            </div>
        ); 
    }

}
export default Home;