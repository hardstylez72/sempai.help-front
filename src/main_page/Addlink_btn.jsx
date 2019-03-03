import React, { Component, } from 'react';
import {
    Grid,
    Jumbotron,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Form,
} from 'react-bootstrap';
import { request, } from '../store/api/request';

class addLink_btn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            descrVal: '',
            urlValue: '',
            articles: [],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.handleChangeDescr = this.handleChangeDescr.bind(this);
    }

    handleChangeUrl(event) {
        this.setState({ urlValue: event.target.value, });
    }

    handleChangeDescr(event) {
        this.setState({ descrVal: event.target.value, });
    }

    handleClick(e) {
        const data = this.state;

        request('/addlink', 'post', data)
            .then(res => res.json())
            .then(dataFromServer => this.setState({ articles: dataFromServer.articles, }));
    }

    render() {
        return (
            <Grid>
                <Form>
                    <FormGroup controlId='formBasicText'>
                        <ControlLabel>Введите ссылку</ControlLabel>
                        <FormControl
                            bsSize='large'
                            componentClass='textarea'
                            placeholder='Enter description'
                            onChange={ this.handleChangeUrl }/>
                    </FormGroup>

                    <FormGroup controlId='formInlineEmail'>
                        <ControlLabel>Введите описание</ControlLabel>
                        <FormControl
                            bsSize='large'
                            componentClass='textarea'
                            placeholder='Enter description'
                            onChange={ this.handleChangeDescr }/>
                    </FormGroup>
                </Form>
                <Button type='submit' onClick={ this.handleClick }>
					Отпавить
                </Button>
            </Grid>
        );
    }
}

export default addLink_btn;
