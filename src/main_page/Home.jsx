import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';

class Home extends Component {
    render() {
        return(
            <div>
                <Grid>
                    <Jumbotron>
                        <h2> Wellcome Home !</h2>
                    </Jumbotron>
                    <Link to="/server_stat">
                        <Button bsStyle="primary"> Server stat </Button>
                    </Link>
                    <Image src="/home.jpg" rounded responsive/>
                    <Image src="/home.jpg" rounded responsive/>
                </Grid>
            </div>

        );
    }
}

export default Home;
