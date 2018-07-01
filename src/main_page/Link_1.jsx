import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';

class LinkToDownload extends Component {
    render() {
        return(
            <div>
                <Grid>
                    <Jumbotron>
                        <h2> Качай сырну сука !</h2>
                    </Jumbotron>
                    
                        <Button 
                        bsStyle="primary"
                        href="/сырна.zip"
                        > СЫРНА </Button>

                        <audio controls> <source src="/dr.mp3"/> </audio>
                </Grid>
            </div>

        );
    }
}

export default LinkToDownload;