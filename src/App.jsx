import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Webm from './main_page/Webm';
import ServerStat from './main_page/ServerStat';
import Home from './main_page/Home'; 
import Navbar from './main_page/NavBar/NavBar';
import Footer from './main_page/Footer/Footer';
import Resource from './main_page/Resource';
import addLink from './main_page/AddLink';
import music from './main_page/Music'; 
import 'antd/dist/antd.css'; 
import { connect } from 'react-redux';

class App extends Component { 
    state = {
        loading: true
      };
      componentDidMount() {
    this.setState({loading: false})
    document.getElementById('preloader').remove();
    //document.body.style.background = "white";
}
  render() {
    const { loading } = this.state;
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }
    return ( <div>
        <Router>
            <div>
                < Navbar />
                <Route exact path="/" component={Home} />
                {/* <Route path="/webm" component={Webm} /> */}
                <Route path="/res" component={Resource} />
                <Route path="/server_stat" component={ServerStat} />
                <Route path="/test" component={addLink} />
                <Route path="/music" component={music} />
                <Footer/>
            </div>
        </Router>
        </div>
    );
  }
}

export default App;
