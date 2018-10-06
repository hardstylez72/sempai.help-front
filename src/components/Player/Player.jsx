import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import {playerActions} from '../../store/player/actions';
import ReactPlayer from 'react-player';
import {Icon} from 'antd';
import store from '../../store/rootStore';
import './Player.css'

class Player extends Component {
	render() {
		const {player, startPlay, stopPlay} = this.props;
		return (
			<div>
				<ReactPlayer
					url={`/radio/${player.nowPlayingURL}`}
					volume={player.volume}
					onEnded={this.currentMediaFileEndedPlaying.bind(this)}
					playing={player.play}
					width={0}
					height={0}
					ref={this.playerRef}
					onProgress={this.onProgress.bind(this)}
					onDuration={this.onDuration.bind(this)}
					progressInterval={50}
				/>
				<div className={'player-container'} id={'player-background'}>
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
						<div className={'player-volume-slider'}>
							<input
								className={'volume-changer'}
								type="range"
								min="0"
								max="100"
								onChange={this.onVolumeChange.bind(this)}
								value={Number(player.volume) * 100}
							/>
						</div>
					</div>
					<div className={'player-footer'} >
						<input
							type="range"
							min="0"
							max={player.duration}
							onMouseDown={this.onSeekMouseDown.bind(this)}
							onChange={this.onSeekChange.bind(this)}
							onMouseUp={this.onSeekMouseUp.bind(this)}
							value={Math.round(player.trackInfo.playedSeconds)}
						/>
						{player.trackInfo.playedSeconds ? Math.round(player.trackInfo.playedSeconds) : ''}/
						{player.duration ? Math.round(player.duration) : ''}
					</div>
				</div>
			</div>
		);
	}
	playerRef = player => {
		this._player = player;
	};
	onVolumeChange = (event) => {
		store.dispatch(playerActions.changeVolume(event.target.value));
	};
	onDuration = () => {
		store.dispatch(playerActions.setDuration(this._player.getDuration()));
	};
	onProgress = (event) => {
		if (this.props.player.seeking !== true) {
			store.dispatch(playerActions.setTrackInfo(event));
		}
	};
	onSeekChange = (event) => {
		if (this.props.player.seeking !== true) {
			this._player.seekTo(event.target.value);
		}
	};
	onSeekMouseDown = (event) => {
		store.dispatch(playerActions.setSeeking(true));
		store.dispatch(playerActions.setTrackInfo(event));
	};
	onSeekMouseUp = (event) => {
		store.dispatch(playerActions.setSeeking(false));
	};
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
		player: state.player,
	}),
	dispatch => ({
		startPlay: bindActionCreators(playerActions.audioPaused, dispatch),
		stopPlay: bindActionCreators(playerActions.audioPlaying, dispatch),
	}),
)(Player);
