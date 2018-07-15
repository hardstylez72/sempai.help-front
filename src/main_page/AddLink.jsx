import React, { Component } from 'react';
import {Grid, 
        Jumbotron,
        FormGroup, 
        ControlLabel, 
        FormControl, 
        Modal, 
        Button, 
        Form,
        ListGroup,
        ListGroupItem,
        Table,
        Alert
    } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import addLink_btn from './Addlink_btn.jsx';
import './AddLink.css';
import alertError from './alert.jsx';



class addLink extends Component {

        constructor(props, context) {
          super(props, context);
          this.state = {
            descrVal: '',
            urlValue: '',
            articles: [],
            showCreatePost: false,
            showAlert: false
          };

          this.handleClickBtnCreatePost = this.handleClickBtnCreatePost.bind(this);
          this.handleClick = this.handleClick.bind(this);
          this.handleChangeUrl = this.handleChangeUrl.bind(this);
          this.handleChangeDescr = this.handleChangeDescr.bind(this);
          this.handleClickClose = this.handleClickClose.bind(this);

        }

        handleClickClose(e) {
            this.setState({showCreatePost: false});
        }
        handleClickBtnCreatePost(e) {
            this.setState({showCreatePost: true});
        }
        handleChangeUrl(event) {
            this.setState({urlValue: event.target.value});
          }

          handleChangeDescr(event) {
            this.setState({descrVal: event.target.value});
          }


        handleClick(e) {
            this.setState({showCreatePost: false});
            var data = this.state;
            fetch('/addlink', {
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({data})
              }).then(res=>res.json())
                .then(dataFromServer => this.setState({articles: dataFromServer.articles}))
            }
        componentDidMount(){
            var data = {
                urlValue: 'give', //нужно доделать
                descrVal: 'data'
            }
            fetch('/addlink', {
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({data})
              }).then(res=>res.json())
                .then(dataFromServer => {
                    if (dataFromServer.sucsess === "1") {
                        this.setState({articles: dataFromServer.articles})
                    } else {
                        this.setState({showAlert: true})
                    }
                })
        }
    
        render() {
        return(
            <Jumbotron>
            <Grid>
                <Modal
                    show={this.state.showCreatePost}
                    dialogClassName="custom-modal"
                >
                <Modal.Title>
                    Создание нового поста
                </Modal.Title>
                <Form>                    
                    <FormGroup controlId="formBasicText">
                    <ControlLabel>Введите ссылку</ControlLabel>
                            <FormControl
                                bsSize="large"
                                componentClass="textarea"
                                placeholder="Введите ссылку"
                                onChange={this.handleChangeUrl}
                            />
                   </FormGroup>

                   <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Введите описание</ControlLabel>

                            <FormControl
                                bsSize="large"
                                componentClass="textarea"
                                placeholder="Введите описание"
                                onChange={this.handleChangeDescr}
                                className="bozdo"
                            />
                    </FormGroup>
                </Form>
                 <Button type="submit" onClick={this.handleClick}>Отпавить</Button>
                 <Button type="submit" onClick={this.handleClickClose}>Закрыть</Button>
                 </Modal>

                <Button 
                    type="submit" 
                    onClick={this.handleClickBtnCreatePost}
                >
                    Создать запись
                </Button>


                <Alert bsStyle="warning">
                    <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
                    good.
                </Alert>

                {(this.state.articles) ? 
                (this.state.articles.map(articles =>
                        <div key={articles.id}> 
                            <a href={articles.link}>{articles.descr} </a> 
                            {articles.createdAt}
                        </div> 
                ))
                : ('') }


            </Grid>
            </Jumbotron>
        );
    }
}

export default addLink;
