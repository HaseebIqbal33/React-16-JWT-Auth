import React from 'react';
import axios from 'axios';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }        
    }
    componentWillMount() {
        console.log('Component Will Mount');
        axios.get('http://localhost:3001/todos').then(response => {
            this.setState({
                todos: response.data
            });
        }).catch(error => {
            if(error.response) {
                console.log(error.response);
            }
        })
    }
    
    componentDidMount() {
        console.log('Component Did Mount');
    }

    render() {
        var todos = this.state.todos.map( (todo) => {
            return( <li key={todo.id}>{ todo.title }</li> )
        });
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-sm-6">
                        <h2>Welcome Admin </h2>
                        <ul>
                            { todos }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Admin;
