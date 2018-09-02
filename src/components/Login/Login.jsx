import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Input, Button } from 'antd';
import {loginActions} from '../../store/login/actions'
import './Login.css'
import store from '../../store/rootStore';
class Login extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			pwd: '',
			login: ''
		};
	}
	render() {
		if (this.props.login.pwd) {
			return null;
		}
		return (
			<div className={'login-container'}>

				<Input
					className={'login-input'}
					type={'text'}
					placeholder={'Login'}
					size={'small'}
					onChange={this.onChangeLoginHandler.bind(this)}
					onPressEnter={this.handleSubmit.bind(this)}/>

				<Input
					type={'text'}
					placeholder={'password'}
					onPressEnter={this.handleSubmit.bind(this)}
					onChange={this.onChangePwdHandler.bind(this)}
					size={'small'}/>
				<Button onClick={this.handleSubmit.bind(this)}  type="primary" className="login-form-button">
					Log in
				</Button>

			</div>
		);
	}
	handleSubmit = () => {
		store.dispatch(loginActions.curUserLogin({login: this.state.login, pwd: this.state.pwd}));
	};
	onChangeLoginHandler = (e) => {
		this.setState({login: e.target.value});
	};
	onChangePwdHandler = (e) => {
		this.setState({pwd: e.target.value});
	}
}

export default connect(
	state => ({
		login: state.login,
	})
)(Login);
