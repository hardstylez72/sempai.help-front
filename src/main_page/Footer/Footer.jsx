import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Media, Player, controls } from 'react-media-player';
const { PlayPause, MuteUnmute, Progress, SeekBar } = controls;

class Footer extends Component {
	render() {
		return (
			<Navbar fixedBottom>
				<Navbar.Text>Ramen company ltd.</Navbar.Text>
				<Media>
					<div className="media">
						<div className="media-player">
							<Player src="/radio" vendor="audio" />
						</div>
						<div className="media-controls">
							<PlayPause className="playButton" />
							<MuteUnmute />
							<SeekBar />
						</div>
					</div>
				</Media>
			</Navbar>
		);
	}
}

export default Footer;
