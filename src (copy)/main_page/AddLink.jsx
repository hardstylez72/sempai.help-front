import React, {Component} from 'react';
import {Grid, Jumbotron, FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap';

import {Table, Icon, Modal} from 'antd';
import {Drawer, Form, Button, Col, Row, Input, Select, message} from 'antd';
import './AddLink.css';
const {TextArea} = Input;
const FormItem = Form.Item;

const msg = (messageType, messageText) => {
    switch(messageType) {
        case 'err':
            message.error(messageText);
            break;
        case 'ok':
            message.success(messageText);
            break;
        case 'load':
            message.info(messageText);
            break;
    }
};

class addLink extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			descrVal: '',
			urlValue: '',
			articles: [],
			createPostVisible: false,
			showAlert: false,
		};

		this.handleClickBtnCreatePost = this.handleClickBtnCreatePost.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeUrl = this.handleChangeUrl.bind(this);
		this.handleChangeDescr = this.handleChangeDescr.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.changeArticleButton = this.changeArticleButton.bind(this);
    }
    
    changeArticleButton(e) {
        console.log('ti xuy', e);
    }

	handleCancel(e) {
		this.setState({createPostVisible: false});
	}

	handleClickClose(e) {
		this.setState({createPostVisible: false});
	}
	handleClickBtnCreatePost(e) {
		this.setState({createPostVisible: true});
	}
	handleChangeUrl(event) {
		this.setState({urlValue: event.target.value});
	}

	handleChangeDescr(event) {
		this.setState({descrVal: event.target.value});
	}

	handleClick(e) {
		this.setState({createPostVisible: false});
		var data = this.state;
		fetch('/addlink', {
			method: 'post',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({data}),
		})
			.then(res => res.json())
			.then(dataFromServer => {
                msg('ok','Запись успено заружена');
                this.setState({articles: dataFromServer.articles})
            })
			.catch(err => {
                msg('err','Ошибка при загрузке данных с сервера');
				console.log(err);
			});
    }
    
	componentDidMount() {
		var data = {
			urlValue: '', //нужно доделать
			descrVal: '',
			preload: true,
		};
		fetch('/addlink', {
			method: 'post',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({data}),
		})
			.then(res => res.json())
			.then(dataFromServer => {
				if (dataFromServer.sucsess === '1') {
                    msg('ok','Данные успешно загружены');
					this.setState({articles: dataFromServer.articles});
				} else {
                    msg('err','Ошибка при загрузке данных с сервера');
					this.setState({showAlert: true});
				}
			})
			.catch(err => {
                msg('err','Ошибка при загрузке данных с сервера');
				console.log(err);
            });  
	}

	render() {

		const columns = [
			{
				title: 'Описание',
				dataIndex: 'descr',
				key: 'name',
			},
			{
				title: 'Ссылка',
				dataIndex: 'link',
				key: 'age',
			},
			{
				title: 'Дата создания',
				dataIndex: 'createdAt',
				key: 'address',
			},
			{
				title: 'Action',
                key: 'action',
                render: () => { return (<button onClick={this.changeArticleButton}>Изменить</button>);}
			},
		];

		return (
			<Jumbotron>
				<Grid>
					<Button type="submit" onClick={this.handleClickBtnCreatePost}>
						Создать запись
					</Button>

					<Table
						hideOnSinglePage="true"
						columns={columns}
						dataSource={this.state.articles}
					/>
					<Modal
						onOk={this.handleClick}
						title="Создание статьи"
						visible={this.state.createPostVisible}
						onCancel={this.handleCancel}
					>
						<Form>
							<FormItem>
								<div className="link-input">
									<TextArea
										placeholder="http://"
										autosize={{minRows: 1, maxRows: 3}}
										onChange={this.handleChangeUrl}
									/>
								</div>
								<div className="short-descr-input">
									<TextArea
										placeholder="Описание"
										autosize={{minRows: 1, maxRows: 2}}
										wh
									/>
								</div>
								<div className="descr-input">
									<TextArea
										placeholder="Подробное описание"
										autosize={{minRows: 2, maxRows: 8}}
										onChange={this.handleChangeDescr}
									/>
								</div>
							</FormItem>
						</Form>
					</Modal>
				</Grid>
			</Jumbotron>
		);
	}
}

export default addLink;
