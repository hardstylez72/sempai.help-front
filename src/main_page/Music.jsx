import React, {Component} from 'react';
import {getFolderStruct} from '../transport/addLinkTr.jsx';
import {message, Layout, Row, Col, Icon} from 'antd';
import {Treebeard, decorators} from 'react-treebeard';
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
			playedSeconds: null,
			imagePreviewUrl: '',
		};
		this.onToggle = this.onToggle.bind(this);
	}

	render() {
		const {player} = this.props;
		return (
			<div>
				{/* <SketchPicker
					onChangeComplete={this.handleChangeComplete}
				/> */}
				<div className="general-content">
					<div className={'treebeard-contaiter'}>
						<Treebeard
							className={'treebeard'}
							data={player.folderStruct}
							onToggle={this.onToggle}
							decorators={decorators}
							style={sempaiTreeStyle}
						/>
					</div>

					<div className={'cover-contaiter'}>
						<ul>
							<li className={'undercover-list-item'} >{player.cover ? (
								<span>
									<img className={'cover-img'} src={player.cover} />
								</span>
							) : (
								<span>Пусто</span>
							)}
							</li>
							<li className={'undercover-list-item'}>
								<b>Трек:</b> {player.nowPlayingName ? player.nowPlayingName : ''}
							</li>
							<li className={'undercover-list-item'}>

									<Icon
										onClick={this.onDownloadClickHandler.bind(this)}
										type="download"
										className={'player-btn'}
										style={{fontSize: 46, color: '#08c'}}
									/>

							</li>
						</ul>
					</div>

				</div>
			</div>
		);
	}

	// handleChangeComplete = color => {
	// 	document.body.style['background-color'] = `${color.hex}`;
	// };
	onDownloadClickHandler = () => {
		// fetch(`/radio/download/${this.props.player.nowPlayingURL}`).then(res => {
		// 	const fileStream = streamSaver.createWriteStream('filename.flac')
		// 	const writer = fileStream.getWriter()
		// 	// Later you will be able to just simply do
		// 	// res.body.pipeTo(fileStream)
		//
		// 	const reader = res.body.getReader()
		// 	const pump = () => reader.read()
		// 		.then(({ value, done }) => done
		// 			// close the stream so we stop writing
		// 			? writer.close()
		// 			// Write one chunk, then get the next one
		// 			: writer.write(value).then(pump)
		// 		)
		//
		// 	// Start the reader
		// 	pump().then(() =>
		// 		console.log('Closed the stream, Done writing')
		// 	)
		// })
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
			store.dispatch(
				playerActions.playThisSong(node.name, node.path, this.props.player.folderStruct),
			);
		}
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
)(music);
