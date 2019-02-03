import React, {Component} from 'react';
import {message, Icon} from 'antd';
import {Treebeard, decorators} from 'react-treebeard';
import sempaiTreeStyle from '../../main_page/sempaiTreeStyle';
import store from '../../store/rootStore';
import {playerActions} from '../../store/player/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tab, Tabs } from 'react-bootstrap';
import './Music.css';
import TrackCard from './TrackCard';
import UploadFiles from '../UploadFiles/UploadFiles';
import RefreshButton from './RefreshButton'


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
	const isFile = iconType === 'file';
	const iconClass = `treebeard-list-${iconType}`;
	const iconStyle = {marginRight: '5px'};
	const refreshButton = node.root ? <RefreshButton/> : '';

	return (
		<div className={'base-treebeard-header'}>
			<div className={'base-treebeard-title'}>

				<div className={iconClass} style={iconStyle}>
					{node.name} {refreshButton}

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
				<div className="general-content">
					<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
						<Tab eventKey={1} title="Коллекция">
							<div className={'treebeard-contaiter'}>
								<Treebeard
									className={'treebeard'}
									data={player.folderStruct}
									onToggle={this.onToggle}
									decorators={decorators}
									style={sempaiTreeStyle}
								/>
							</div>
						</Tab>
						<Tab eventKey={2} title="Любимое">
							<div className={'treebeard-contaiter'}>
								<Treebeard
									className={'treebeard'}
									data={player.favorite}
									onToggle={this.onToggle}
									decorators={decorators}
									style={sempaiTreeStyle}
								/>
							</div>
						</Tab>
						<Tab eventKey={3} title="Свое">
							<div className={'treebeard-contaiter'}>
								<Treebeard
									className={'treebeard'}
									data={player.uploaded}
									onToggle={this.onToggle}
									decorators={decorators}
									style={sempaiTreeStyle}
								/>
							</div>
						</Tab>
						<Tab eventKey={4} title="Загрузка">
							<UploadFiles paths={player.folderStruct}/>
						</Tab>
					</Tabs>;
					<TrackCard player={player}/>
				</div>
			</div>
		);
	}
	
	componentDidMount() {
		store.dispatch(playerActions.audioPaused);
		(async () => {
			try {
				const folderStruct = await store.dispatch(playerActions.getFolderStruct(null));
				store.dispatch(playerActions.setStruct(folderStruct));
				const favoriteTracks = await store.dispatch(playerActions.getFavTracks());
				store.dispatch(playerActions.setFavoriteStruct(favoriteTracks));
				// const uploadedTracks = await store.dispatch(playerActions.getUploadedTracks());
				// store.dispatch(playerActions.setUpdateStruct(uploadedTracks));
			} catch (err) {
				msg('err', 'Ошибка при загрузке данных с сервера', err);
			}
		})();
	}
	
	async onToggle(node, toggled) {

		if (node.root) {
			return;
		}

		switch(true) {
			case (node.isDirectory && !node.isUploaded): // неоткрытая папка
				const pathLocation = `${node.path}`;
				const folderContent = await store.dispatch(playerActions.getFolderStruct(pathLocation));
				node.children = folderContent;
				node.isUploaded = true;
				break;
			case (node.isDirectory && node.isUploaded): // открытая папка
				break;
			default:
				if (this.props.player.play === true && node.name === this.props.player.nowPlayingName) {
					store.dispatch(playerActions.audioPaused);
					return;
				} else {
					store.dispatch(playerActions.audioPlaying);
				}
				store.dispatch(playerActions.playThisSong(node.name, node.path, this.props.player.folderStruct));
				break;
		}

		if (this.state.cursor) {
			this.state.cursor.active = false;
		}
		node.active = true;
		if (node.children) {
			node.toggled = toggled;
		}
		this.setState({cursor: node});
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
