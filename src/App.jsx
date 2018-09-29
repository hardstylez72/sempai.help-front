import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Webm from './main_page/Webm';
import ServerStat from './main_page/ServerStat';
import Home from './main_page/Home'; 
import Navbar from './main_page/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Resource from './main_page/Resource';
import addLink from './main_page/AddLink';
import music from './main_page/Music';
import Login from './components/Login/Login.jsx'
import 'antd/dist/antd.css';
import './App.css';
import './slider.css'
import { connect } from 'react-redux';
import { Alert } from 'antd';
import _ from 'lodash';
import store from './store/rootStore';
import {loginActions} from './store/login/actions';

const ErrorMessage = (messageLog) => {
	const message = _.get(messageLog, 'error.message', 'Ошибка');
	const description = _.get(messageLog, 'error.stack', 'Неизвестная ошибка');
	if (messageLog.errorShow) {
		return <Alert message={message} description={description} type="error" showIcon banner closable={true}/>;
	}
};


const InfoMessage = (messageLog) => {
	return messageLog.infoShow ? <Alert message={messageLog.info} type="info" showIcon closable={true}/> : '';
};

const WarnMessage = (messageLog) => {
	return messageLog.warnShow ? <Alert message={messageLog.warn} type="warning" showIcon closable={true}/> : '';
};

const SuccessMessage = (messageLog) => {
	return messageLog.successShow ? <Alert message={messageLog.success} type="success" showIcon closable={true}/> : '';
};

class App extends Component {

    state = {
        loading: true,
		path: ''
      };
componentDidMount() {
	const nowPath = window.location.pathname;
	this.setState({path: nowPath});
	(async () => {
		await store.dispatch(loginActions.authReq());
		document.getElementById('preloader').remove();
		this.setState({loading: false});
	})();
}
componentWillUpdate() {

}
  render() {
  	let {login, messageLog} = this.props;
    const { loading } = this.state;
    if(loading) {
        return null;
    }
    return (
        <div>
            <Router>
                <div>
					{ErrorMessage(messageLog)}
					{InfoMessage(messageLog)}
					{WarnMessage(messageLog)}
					{SuccessMessage(messageLog)}
					<Wrapper component={Navbar} login={login}/>
					<Route path="/login" component={Login}/>
					<Switch>
						<PrivateRoute path="/main" component={Home}  login={login} state={this.state}/>
						<PrivateRoute path="/res" component={Resource}  login={login} state={this.state}/>
						<PrivateRoute path="/server_stat" component={ServerStat}  login={login} state={this.state}/>
						<PrivateRoute path="/test" component={addLink}  login={login} state={this.state}/>
						<PrivateRoute path="/music" component={music}  login={login} state={this.state}/>
						<PrivateRoute component={Home} login={login} state={this.state}/> {/*Придумать отлов 404 поумнее*/}
					</Switch>
                    <div  className={'footer-container'}>
                    <Wrapper component={Footer}  login={login}/>
                    </div>
                    <div id={'footer-background'}/>

                    {/* <Route path="/webm" component={Webm} /> */}
                </div>
            </Router>
        </div>
    );
  }
}

const Wrapper = ({component: Cmponent, login}) => {
	if (login.authState) {

		return (
			<Cmponent/>
		)
	} else {
		return null;
	}

};
const PrivateRoute = ({ component: Component, ...rest, login, state}) => {
	return(
	<Route
		{...rest}
		render={(props) => {
			if (state.loading) {
				return null;
			}
			if (login.authState) {
				props.location.pathname = state.path;
				return <Component {...props} />;
			}

			return <Redirect to={{pathname: "/login"}}/>
		}}
	/>
)};


export default connect(
	state => ({
		login: state.login,
		messageLog: state.message
	})
)(App);
