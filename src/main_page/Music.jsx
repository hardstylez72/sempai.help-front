import React, {Component} from 'react';
import {getFolderStruct} from '../transport/addLinkTr.jsx';
import {message, Layout, Row, Col, Icon} from 'antd';
import {Treebeard, decorators} from 'react-treebeard';
import ReactPlayer from 'react-player';

import sempaiTreeStyle from './sempaiTreeStyle';
import store from '../store/rootStore';
import {playerActions} from '../store/player/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SketchPicker} from 'react-color';

import './Music.css';
const {Sider, Content} = Layout;

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

decorators.Header = ({style, node}) => {
	const iconType = node.children ? 'folder' : 'file';
	const iconClass = `treebeard-list-${iconType}`;
	const iconStyle = {marginRight: '5px'};

	return (
		<div className={'base-treebeard-header'}>
			<div className={'base-treebeard-title'}>
				<div className={iconClass} style={iconStyle}>
					{node.name}
				</div>
			</div>
		</div>
	);
};

class music extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			folderStruct: {},
			seeking: false,
			seekDuration: '',
			imagePreviewUrl: '',
		};
		const {startPlay} = this.props;

		this.onToggle = this.onToggle.bind(this);
		this.currentMediaFileEndedPlaying = this.currentMediaFileEndedPlaying.bind(this);
		this.handleChangeComplete = this.handleChangeComplete.bind(this);
	}

	render() {
		const {player, startPlay, stopPlay} = this.props;
		return (
			<div>
				{/* <SketchPicker
					onChangeComplete={this.handleChangeComplete}
				/> */}
				<div className="general-content">
					<div>
						<Treebeard
							className={'treebeard-contaiter'}
							data={player.folderStruct}
							onToggle={this.onToggle}
							decorators={decorators}
							style={sempaiTreeStyle}
						/>
					</div>

					<div className={'cover-contaiter'}>
						{this.props.player.cover ? (
							<span>
								<img className={'cover-img'} src={player.cover} />
							</span>
						) : (
							<span>Пусто</span>
						)}
					</div>
				</div>

				<ReactPlayer
					url={`/radio/${player.nowPlayingURL}`}
					onEnded={this.currentMediaFileEndedPlaying}
					playing={player.play}
					width={0}
					height={0}
					ref={this.playerRef}
					onProgress={this.onProgress.bind(this)}
					progressInterval={500}
				/>
				<div className={'player-container'}>
					<div className={'player-header'}>
						{player.nowPlayingName ? player.nowPlayingName : 'Включи песню'}
					</div>
					<div className={'player-content'}>
						<div
							className={'player-btn-container'}
							onClick={() => {
								player.play ? startPlay() : stopPlay();
							}}
						>
							{player.play ? (
								<Icon
									type="pause-circle-o"
									className={'player-btn'}
									style={{fontSize: 46, color: '#08c'}}
								/>
							) : (
								<Icon
									type="play-circle-o"
									className={'player-btn'}
									style={{fontSize: 46, color: '#08c'}}
								/>
							)}
						</div>
						<div
							className={'player-btn-container'}
							onClick={() => {
								store.dispatch(
									playerActions.playThisSong(
										player.prevTrack.name,
										player.prevTrack.path,
										player.folderStruct,
									),
								);
							}}
						>
							<Icon
								type="backward"
								className={'player-btn'}
								style={{fontSize: 46, color: '#08c'}}
							/>
						</div>
						<div
							className={'player-btn-container'}
							onClick={() => {
								store.dispatch(
									playerActions.playThisSong(
										player.nextTrack.name,
										player.nextTrack.path,
										player.folderStruct,
									),
								);
							}}
						>
							<Icon
								type="forward"
								className={'player-btn'}
								style={{fontSize: 46, color: '#08c'}}
							/>
						</div>
					</div>
					<div className={'player-footer'} >
						<input
							type="range"
							min="0"
							max={player.duration}
							onClick={this.seekHandler.bind(this)} 
							value={this.state.seeking ? this.state.seekDuration : player.stats.playedSeconds}
						/>
						</div>
				</div>
			</div>
		);
	}
	playerRef = player => {
		this._player = player
	}

	onProgress = (event) => {
		//this.setState({seeking: false});
		const duration = this._player.getDuration();
		if (this.state.seeking !== true)
		store.dispatch(playerActions.setCurStat(event, duration));
	}
	seekHandler = (event) => {
		this._player.seekTo(event.target.value)
		this.setState({seeking: true});
		this.setState({seekDuration: event.target.value});
		
	} 
	handleChangeComplete = color => {
		document.body.style['background-color'] = `${color.hex}`;
	};
	componentDidMount() {
		store.dispatch(playerActions.audioPaused);
		(async () => {
			try {
				const folderStruct = await getFolderStruct('/music/');
				store.dispatch(playerActions.updateStruct(folderStruct));
			} catch (err) {
				msg('err', 'Ошибка при загрузке данных с сервера', err);
			}
		})();
	}
	onToggle(node, toggled) {
		if (this.state.cursor) {
			this.state.cursor.active = false;
		}
		node.active = true;
		if (node.children) {
			node.toggled = toggled;
		}
		this.setState({cursor: node});
		if (node.extension === '.flac' || node.extension === '.mp3') {
			const self = this;
			if (this.props.player.play === true && node.name === this.props.player.nowPlayingName) {
				store.dispatch(playerActions.audioPaused);
				return;
			} else {
				store.dispatch(playerActions.audioPlaying);
			}
			store.dispatch(playerActions.getCoverImage(node.path));
			// .then(imgURL => (document.body.style['background-image'] = `url(${imgURL})`))
			// .catch(err => msg('err', err));

			store.dispatch(
				playerActions.playThisSong(node.name, node.path, this.props.player.folderStruct),
			);
		}
	}

	currentMediaFileEndedPlaying() {
		store.dispatch(
			playerActions.playThisSong(
				this.props.player.nextTrack.name,
				this.props.player.nextTrack.path,
				this.props.player.folderStruct,
			),
		);
		store.dispatch(playerActions.audioPlaying);
	}
}

export default connect(
	state => ({
		player: state.palyer,
	}),
	dispatch => ({
		startPlay: bindActionCreators(playerActions.audioPaused, dispatch),
		stopPlay: bindActionCreators(playerActions.audioPlaying, dispatch),
	}),
)(music);
