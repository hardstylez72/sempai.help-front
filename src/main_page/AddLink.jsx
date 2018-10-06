import React, {Component} from 'react';
import {Grid, Jumbotron} from 'react-bootstrap';

import {Table, Modal} from 'antd';
import {Form, Button, Input, message} from 'antd';
import './AddLink.css';
import {putNewArticle, getArticles, deleteArticle, updateArticle} from '../transport/addLinkTr.jsx';
const {TextArea} = Input;
const FormItem = Form.Item;

const msg = (messageType, messageText) => {
	switch (messageType) {
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
			descr: '',
			url: '',
			abstract: '',
			articles: [],
			createPostVisible: false,
			showAlert: false,
			descrValue: ''
		};

		this.handleClickBtnCreatePost = this.handleClickBtnCreatePost.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeUrl = this.handleChangeUrl.bind(this);
		this.handleChangeDescr = this.handleChangeDescr.bind(this);
		this.handleClickClose = this.handleClickClose.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.changeArticleButton = this.changeArticleButton.bind(this);
		this.handleChangeAbstract = this.handleChangeAbstract.bind(this);
		this.deleteArticleButton = this.deleteArticleButton.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	changeArticleButton(e, data) {
		this.setState({createPostVisible: true});
		// try {
		// 	const updatedArticleData = {
		// 		descr: this.state.descr,
		// 		abstract: this.state.abstract,
		// 		url: this.state.url,
		// 		user: 'hardstylez72',
		// 	};
		// 	await updateArticle('/addlink', updatedArticleData);
		// 	msg('ok', 'Данные успешно обновлены');
		// } catch(err) {
		// 	msg('err', 'Ошибка при загрузке данных с сервера');
		// }
		console.log('ti xuy', data);
		console.log('ti xuy', e);
	}
	async deleteArticleButton(e, data) {
		try {
			await deleteArticle('/addlink', data);
				//todo update() для обновления данных новой статьи
				{
					const amount = 10;
					const offset = 0;
					const articles = await getArticles('/addlink', amount, offset);
					this.setState({articles: articles});
				}
		} catch(err) {
			msg('ok', 'Данные успешно удалены');
			msg('err', 'Ошибка при загрузке данных с сервера');
		}
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
		this.setState({url: event.target.value});
	}
	handleChangeDescr(event) {
		this.setState({descr: event.target.value});
	}
	handleChangeAbstract(event) {
		this.setState({abstract: event.target.value});
	}
	handleClickOutside(event) {
		console.log(event);
	}
	async handleClick(e) {
		try {
			const newArticleData = {
				descr: this.state.descr,
				abstract: this.state.abstract,
				url: this.state.url,
				user: 'hardstylez72',
			};
			await putNewArticle('/addlink', newArticleData);
			this.setState({createPostVisible: false});
			msg('ok', 'Данные успешно загружены');
			this.setState({
				descr: '',
				url: '',
				abstract: '',
			});

			//todo update() для обновления данных новой статьи
			{
				const amount = 10;
				const offset = 0;
				const articles = await getArticles('/addlink', amount, offset);
				this.setState({articles: articles});
			}
		} catch (err) {
			msg('err', 'Ошибка при загрузке данных с сервера');
		}
	}

	componentDidMount() {
		(async () => {
			try {
				const amount = 10;
				const offset = 0;
				const articles = await getArticles('/addlink', amount, offset);
				this.setState({articles: articles});
			} catch (err) {
				msg('err', 'Ошибка при загрузке данных с сервера');
			}
		})();
	}

	render() {
		const columns = [
			{
				title: 'Описание',
				dataIndex: 'abstract',
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
				render: dataIndex => {
					return (
						<span>
							<button
								id={dataIndex.key}
								onClick={data => this.changeArticleButton(data, dataIndex)}
							>
								Изменить
							</button>
							<button onClick={data => this.deleteArticleButton(data, dataIndex.key)}>
								Удалить
							</button>
						</span>
					);
				},
			},
		];

		return (
			<Jumbotron>
				<Grid>
					<Button type="submit" onClick={this.handleClickBtnCreatePost}>
						Создать запись
					</Button>
					<Table
						className="table-links"
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
							<FormItem
							required={true}>
								<div className="link-input">
									<TextArea
										placeholder="http://"
										autosize={{minRows: 1, maxRows: 7}}
										onChange={this.handleChangeUrl}
									/>
								</div>
								<div className="short-descr-input">
									<TextArea
										placeholder="Описание"
										autosize={{minRows: 1, maxRows: 2}}
										onChange={this.handleChangeAbstract}
									/>
								</div>
								<div className="descr-input">
									<TextArea
										placeholder="Подробное описание"
										autosize={{minRows: 2, maxRows: 8}}
										onChange={this.handleChangeDescr}
										//value={this.state.descrValue} //todo исправить
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
