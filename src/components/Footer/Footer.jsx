import React, { Component } from 'react';
import './Footer.css';
import connect from 'react-redux/es/connect/connect';
import Player from '../Player/Player.jsx'

class Footer extends Component {
	render() {
		return (
			<div>
				<Player/>
			</div>
		);
	}
}

export default connect(
	state => ({
		player: state.player,
	})
)(Footer);
