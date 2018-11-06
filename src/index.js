import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
//import registerServiceWorker from './registerServiceWorker';
//import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import {Provider} from 'react-redux';
import store from './store/rootStore';
//require('dotenv').config();

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root'),
);
//registerServiceWorker();
//unregisterServiceWorker();