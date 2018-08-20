import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';

class ServerStat extends Component {
    render() {
        return(
            <div>
                <Grid>
                    <Jumbotron>
                        <h2> Server_stat </h2>
                    </Jumbotron>
                </Grid>
            </div>
        );
    }
}

export default ServerStat;
