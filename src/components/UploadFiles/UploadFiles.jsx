import React, { Component } from 'react';
import { Icon, Progress } from 'antd'
import Dropzone from 'react-dropzone';

import { OverlayTrigger, Popover, ListGroup, ListGroupItem } from 'react-bootstrap';
import './UploadFiles.css'
import {message} from 'antd/lib/index';
import { Select } from 'antd';
import {connect} from 'react-redux';
import  worker from '../../store/webWorkers/worker-uploader.js'

import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
const Option = Select.Option;


const uploader = new FineUploaderTraditional({
	options: {
		chunking: {
			enabled: true
		},
		deleteFile: {
			enabled: false,
			endpoint: '/api/upload/'
		},
		request: {
			endpoint: '/api/upload/'
		},
		retry: {
			enableAuto: true
		}
	}
})

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

class UploadFiles extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			uploading: false,
			included: false,
			track: this.props.track,
			changedTrack: false,
			socket: {},
			progress: 0,
			curFile: {},
			paths: [],
			pathToUpload: '',
			DragAndDropEnabled: false,
			fileList: [],
			workerUpload: {},
			fr: new FileReader(),
			uploader: worker
		};

	}

	render() {
		const popover = (
			<Popover id="popover-positioned-left" title="Важная информация">
				Если хочешь залить свое музло: <br/>
				1) Собери его в папку <br/>
				2) Заархивируй её в zip архив <br/>
				3) Выбери папку из списка выше, куда хочешь заливать <br/>
				4) Можешь заливать
			</Popover>
		);


		const getFileList = list => {
			if (Array.isArray(list)) {
				return list.map(el => {
					if (el.success) {
						return (<ListGroupItem  bsStyle="success">{el.file} ОК</ListGroupItem>)
					}
					return (<ListGroupItem  bsStyle="danger">{el.file} ОШИБКА</ListGroupItem>)
				});
			}
			return null;
		};

		const uploadButton = (
			<div>
				<Icon className={'upload-start-icon'} type={this.state.uploading ? '' : 'upload'} />
				{this.state.uploading ? (<Progress type="circle" percent={this.state.progress} width={80} />) : ('')}
			</div>
		);
		let children = this.state.paths;
		let { DragAndDropEnabled, fileList } = this.state;
		return(
			<div>
				<Gallery uploader={ uploader } />
				<div className={'upload-container'}>
					<Select
						className={'select-download-folder'}
						placeholder="Выбери папку"
						onChange={this.onSelectHandler.bind(this)}
					>
						{children}
					</Select>
					<OverlayTrigger  placement="right" trigger={['hover', 'focus']} overlay={popover}>
					<Dropzone
						disabled={!DragAndDropEnabled}
						multiple={false}
						className="dropZone"
						acceptClassName="dropZone-accept"
						activeClassName="dropZone-active"
						rejectClassName="dropZone-reject"
						accept="application/zip"
						onDropAccepted={this.onDropAccepted.bind(this)}
						onDropRejected={this.onDropRejected.bind(this)}
					>
						{uploadButton}
					</Dropzone>
				</OverlayTrigger>
				</div>
					<div className={'uploaded-file-list'}>
						<ListGroup>
							{getFileList(fileList)}
						</ListGroup>
					</div>

			</div>
		);
	}

	onSelectHandler(selectedPath) {
		if (selectedPath) {
			this.setState({DragAndDropEnabled: true});
		}
		this.setState({pathToUpload: selectedPath});
	}

	onDropRejected(evt) {
		console.log(evt)
	}

	onDropAccepted(evt) {
		if (this.props.socket.disconnected) {
			this.props.socket.connect();
		}
		console.log('Загрузка файлов началась:', evt);
		const file = evt[0];

		this.setState({progress: 0});
		this.setState({fileList: []});
		this.setState({uploading: true});

		const self = this;

		this.state.uploader.postMessage({file: file, userPath: self.state.pathToUpload, api: process.env.REACT_APP_WEBWORKER_UPLOADER_API});

		this.state.uploader.onmessage = async (e) => {
			console.log(e.data);
			const result = e.data;
			if (result.success) {
				self.setState({progress: result.data.progress, fileList: result.data.fileList});
			}
		};
	}

	componentDidMount() {
		const self = this;
		this.props.socket.on('PROGRESS', (data) => {
			self.setState({progress: data})
		});

		this.props.socket.on('connect_error', err => {
			msg('err', `Ошибка при подключении к сокету ${err}`);
		});

		this.props.socket.on('UPLOAD_ERROR', err => {
			self.setState({uploading: false});
			msg('err', `${err}`);
		});

		this.props.socket.on('UPLOAD_SUCCESS', (list) => {
			msg('ok', `${list.length} Файлов успешно загружно`);
			self.setState({uploading: false});
			this.setState({fileList: list});
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.paths !== prevProps.paths) {
			const {paths} = this.props;
			const data = paths.children.map((el) => <Option key={el.name}>{el.name}</Option>);
			this.setState({paths: data})
		}
	}
}


export default connect(
	state => ({
		player: state.player,
		socket: state.webSocket.connection
	})
)(UploadFiles);
