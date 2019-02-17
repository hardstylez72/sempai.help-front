import React, { Component } from 'react';
import { Icon, Progress } from 'antd'
import Dropzone from 'react-dropzone';
import { OverlayTrigger, Popover, ListGroup, ListGroupItem, Button, ProgressBar } from 'react-bootstrap';
import './UploadFiles.css'
import { message } from 'antd/lib/index';
import { Select } from 'antd';
import {connect} from 'react-redux';
import  worker from '../../store/webWorkers/worker-uploader.js'
import {  request } from '../../store/api/request'
import Gallery from 'react-fine-uploader'

const Option = Select.Option;

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
			progress: 0,
			paths: [],
			pathToUpload: '',
			DragAndDropEnabled: false,
			fileList: [],
			file: null,
			uploader: worker,
			isUploadAborted: false
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
				{
					this.state.uploading ?
						<div >
							<Button
								onClick={this.onAbortUpload.bind(this)}
								bsStyle="danger"
								className={"stop-upload-btn"}>
								Отмена
							</Button>
							<Progress  percent={this.state.progress} width={80} />
						</div>
					: null
				}

			</div>
		);
		let children = this.state.paths;
		let { DragAndDropEnabled, fileList } = this.state;
		return(
			<div>
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

	onAbortUpload() {
		this.setState({
			isUploadAborted: true,
			DragAndDropEnabled: true,
			uploading: false,
			file: null
		});


		return request(window.api.UPLOAD_MUSIC_CONTENT, {
			name: this.state.file.name,
			cmd: 'ABORT'
		});
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
		console.log('Загрузка файлов началась:', evt);
		const file = evt[0];

		this.setState({
			uploading: true,
			DragAndDropEnabled: false,
			file: file,
			fileList: [],
			progress: 0
		});


		const self = this;

		this.state.uploader.postMessage({
			file: file,
			path: self.state.pathToUpload,
			api: process.env.REACT_APP_WEBWORKER_UPLOADER_API,
			maxChunkSize: 1024*1024
		});

		this.state.uploader.onmessage = async (e) => {
			const result = e.data;
			console.log('fegegw', result);
			if (result.success) {
				if (result.isAborted) {
					self.setState({
						isUploadAborted: true,
						DragAndDropEnabled: true,
						uploading: false,
						file: null,
						progress: 0
					});
					return;
				}
				if (Number(result.data.progress) === 100) {
					self.setState({
						isUploadAborted: true,
						DragAndDropEnabled: true,
						uploading: false,
						file: null
					});

				}

				self.setState({
					progress: result.data.progress,
					fileList: result.data.fileList
				});
			} else {
				self.setState({
					isUploadAborted: true,
					DragAndDropEnabled: true,
					uploading: false,
					file: null,
					progress: 0
				});
			}
		};
	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps) {
		if (this.props.paths !== prevProps.paths) {
			const {paths} = this.props;
			if (paths) {
				const data = paths.children.map((el) => <Option key={el.name}>{el.name}</Option>);
				this.setState({paths: data})
			}
		}
	}
}


export default connect(
	state => ({
		player: state.player,
		socket: state.webSocket.connection
	})
)(UploadFiles);
