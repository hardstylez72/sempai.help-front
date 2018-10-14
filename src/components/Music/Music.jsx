import React, {Component} from 'react';
import {message, Layout} from 'antd';
import {Treebeard, decorators} from 'react-treebeard';
import sempaiTreeStyle from '../../main_page/sempaiTreeStyle';
import store from '../../store/rootStore';
import {playerActions} from '../../store/player/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SketchPicker} from 'react-color';
import { Tab, Tabs, Grid, Col, Row } from 'react-bootstrap';
import './Music.css';
import  TrackCard from './TrackCard';

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
	const isFile = iconType === 'file';
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
				{/*<Grid>*/}
					{/*<Row className="show-grid">*/}
						{/*<Col sm={6} md={3}>*/}
						{/*</Col>*/}
						{/*<Col sm={6} md={3}>*/}
						{/*</Col>*/}
					{/*</Row>*/}
				{/*</Grid>*/}

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
					</Tabs>;
					<TrackCard player={player}/>
				</div>
			</div>
		);
	}

	// handleChangeComplete = color => {
	// 	document.body.style['background-color'] = `${color.hex}`;
	// };
	componentDidMount() {
		store.dispatch(playerActions.audioPaused);
		(async () => {
			try {
				const folderStruct = await store.dispatch(playerActions.getFolderStruct('/music/', 'post'));
				const favoriteTracks = await store.dispatch(playerActions.getFavTracks('/music/favorite'));
				store.dispatch(playerActions.updateStruct(folderStruct, favoriteTracks));
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
		if (node.type !== 'directory') {
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