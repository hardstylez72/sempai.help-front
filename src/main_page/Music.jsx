import React, {Component} from 'react';
import {getFolderStruct} from '../transport/addLinkTr.jsx';
import {message, Layout} from 'antd';
import {Treebeard, decorators} from 'react-treebeard';
import ReactPlayer from 'react-player';
import {Base64} from 'js-base64';
// import sempaiTreeStyle from './sempaiTreeStyle';
import store from '../store/rootStore';
import {playerActions} from '../store/player/actions';
import {connect} from 'react-redux';
//import Tree from './Tree';
import TreeView from 'react-treeview';
import './Music.css';
const { Sider, Content} = Layout;

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
	const iconType = node.children ? 'folder' : 'file-text';
	const iconClass = `fa fa-${iconType}`;
	const iconStyle = {marginRight: '5px'};

	return (
		<div style={style.base}>
			<div style={style.title}>
				<i className={iconClass} style={iconStyle}/>
				{node.name}
			</div>
		</div>
	);
};

class music extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			folderStruct: {},
			track: {
				paying: '',
				next: '',
				prev: '',
				currentPath: '',
				playingURL: '',
			},
			nowPlaying: '',
		};

		this.onToggle = this.onToggle.bind(this);
		this.clickHandle = this.clickHandle.bind(this);
		this.currentMediaFileEndedPlaying = this.currentMediaFileEndedPlaying.bind(this);
		
	}

	render() {
		return (
			<div>
				<Layout>
					<Content>
						<Treebeard
							data={this.state.folderStruct}
							onToggle={this.onToggle}
							decorators={decorators}
							// style={sempaiTreeStyle}
						/>
					</Content>
					<Sider 
					>
						<div style={{background: 'red', 'min-height': '100px'}} />
					</Sider>
				</Layout>


				<ReactPlayer
					url={`/radio/${this.props.player.nowPlayingURL}`}
					onEnded={this.currentMediaFileEndedPlaying}
					playing={this.props.player.play}
					controls
				/>
			</div>
		);
	}

	
	onToggle2(e) {
		console.log('мой тогл дернулся = ', e);
	}
	clickHandle(e) {
		console.log(e);
	}
	componentDidMount() {
		store.dispatch(playerActions.audioPaused);
		(async () => {
			try {
				const folderStruct = await getFolderStruct('/music/');
				this.setState({folderStruct: folderStruct});
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
			store.dispatch(playerActions.playThisSong(node.name, node.path));
			store
				.dispatch(playerActions.getNextTrack(self.state.folderStruct, node.name))
				.then(nextTrack => {
					store.dispatch({type: 'GET_NEXT_TRACK', payload: nextTrack});
				});
			store
				.dispatch(playerActions.getPrevTrack(self.state.folderStruct, node.name))
				.then(getPrevTrack => {
					console.log('getPrevTrack = ', getPrevTrack);
					// store.dispatch({type: 'GET_NEXT_TRACK', payload: nextTrack});
				});
		}
	}

	currentMediaFileEndedPlaying() {
		store.dispatch(playerActions.playThisSong(this.props.player.nextTrack.name, this.props.player.nextTrack.path));
		store
			.dispatch(
				playerActions.getNextTrack(
					this.state.folderStruct,
					this.props.player.nextTrack.name,
				),
			)
			.then(nextTrack => {
				store.dispatch({type: 'GET_NEXT_TRACK', payload: nextTrack});
			});
		store.dispatch(playerActions.audioPlaying);
	}
}

export default connect(
	state => ({
		player: state.palyer,
	}),
	dispatch => ({}),
)(music);
