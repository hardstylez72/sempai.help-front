import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Webm from './main_page/Webm';
import ServerStat from './main_page/ServerStat';
import Home from './main_page/Home';
import Navbar from './main_page/NavBar/NavBar';
import Footer from './main_page/Footer/Footer';
import Resource from './main_page/Resource';
import addLink from './main_page/AddLink';
import 'antd/dist/antd.css'; 


class App extends Component {
  render() {
    return (
        <Router>
            <div>
                < Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/webm" component={Webm} />
                <Route path="/res" component={Resource} />
                <Route path="/server_stat" component={ServerStat} />
                <Route path="/test" component={addLink} />
                <Footer/>
            </div>
        </Router>
    );
  }
}

export default App;
