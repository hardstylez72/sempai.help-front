import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
class Webm extends Component {
    constructor() {
      super();
      this.state = {
        customers: []
      };
    }

    componentDidMount() {
      fetch('/test/auth')
        .then(res => res.json())
        .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
    }

    render() {
        return(
            <div>
                <Grid>
                    <Jumbotron>
                        <h2> Webm </h2>
                        {this.state.customers.map(customer =>
          <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
        )}
                        <video whidth="300" height="200"  controls>
                         <source src="vid.mp4"/>
                        </video>
                    </Jumbotron>
                </Grid>
            </div>
        );
    }
}

export default Webm;
