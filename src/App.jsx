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
import store from './store/rootStore';
import {loginActions} from './store/login/actions';

class App extends Component {

    state = {
        loading: true
      };
componentDidMount() {
    this.setState({loading: false});
    document.getElementById('preloader').remove();
}
componentWillUpdate() {
	// const autentithicated =  authCheck(this.props.login);
	// console.log('Авторизация:', autentithicated);
}
  render() {
  	let {login} = this.props;
    const { loading } = this.state;
    if(loading) {
        return null;
    }
    return (
        <div>
            <Router>
                <div>
					<Wrapper component={Navbar} login={login}/>
					<Route path="/login" component={Login}/>
					<Switch>
						<PrivateRoute path="/main" component={Home}  login={login}/>
						<PrivateRoute path="/res" component={Resource}  login={login}/>
						<PrivateRoute path="/server_stat" component={ServerStat}  login={login}/>
						<PrivateRoute path="/test" component={addLink}  login={login}/>
						<PrivateRoute path="/music" component={music}  login={login}/>
						<PrivateRoute component={Home} login={login}/> {/*Придумать отлов 404 поумнее*/}
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
const PrivateRoute = ({ component: Component, ...rest, login}) => {
	return(
	<Route
		{...rest}
		render={props =>
			login.authState? (
				<Component {...props} />
			) : ( props.location.pathname !== '/login' ? (
				<Redirect
					to={{
						pathname: "/login",
					}}
				/>
			) : ( null)
			)
		}
	/>
)};


const authCheck = async (login) => {
	if (login.authState) {
		return true;
	}
	try {
		// const data = await store.dispatch(loginActions.checkAuth());
		// console.log('uuid = ', data);
		return true;
	} catch (e) {
		return false;
	}
};

export default connect(
	state => ({
		login: state.login,
	})
)(App);
