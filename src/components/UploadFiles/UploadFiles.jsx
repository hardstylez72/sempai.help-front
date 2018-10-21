import React, { Component } from 'react';
import {request} from '../../store/api/request'
// import './AddToFavorite.css'
import { Icon, Progress } from 'antd'
import Dropzone from 'react-dropzone';
import socketIOClient from 'socket.io-client';
import './UploadFiles.css'
import {message} from 'antd/lib/index';
import { Select } from 'antd';
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
			socket: {},
			progress: 0,
			curFile: {},
			paths: [],
			pathToUpload: ''
		};

	}

	render() {
		const uploadButton = (
			<div>
				<Icon className={'upload-start-icon'} type={this.state.uploading ? '' : 'upload'} />
				{this.state.uploading ? (<Progress type="circle" percent={this.state.progress} width={80} />) : ('')}

			</div>
		);
		let children = this.state.paths;
		return(
			<div>
				<Select
					style={{ width: '60%' }}
					placeholder="Выбери папку"
					onChange={this.onSelectHandler.bind(this)}
				>
					{children}
				</Select>
				<Dropzone
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
			</div>
		);
	}

	onSelectHandler(selectedPath) {
		this.setState({pathToUpload: selectedPath});
	}

	onDropRejected(evt) {
		console.log(evt)
	}

	onDropAccepted(evt) {

		const uploadFile = (file) => {
			this.setState({uploading: true});
			this.setState({curFile: file});
			const self = this;
			this.state.socket.emit('START_UPLOAD', {
				size: file.size,
				name: file.name,
				path: self.state.pathToUpload
			});
			
			const fileSize = file.size;
			const chunkSize = 4096 * 1024; // bytes
			let offset = 0;
			let chunkReaderBlock = null;

			const readEventHandler = (evt) => {
				if (evt.target.error == null) {
					offset += evt.target.result.length;
					this.state.socket.emit('UPLOADING', {
						data: evt.target.result.slice(0, offset),
						curSize: offset,
						size: self.state.curFile.size,
						name: self.state.curFile.name
					});
				} else {
					this.setState({uploading: false});
					this.state.socket.emit('UPLOAD_ABORTED', {
						data: evt.target.result.slice(0, offset),
						curSize: offset,
						size: self.state.curFile.size,
						name: self.state.curFile.name
					});
					return;
				}
				if (offset >= fileSize) {
					this.setState({uploading: false});
					this.state.socket.emit('UPLOAD_FINISHED', {
						data: evt.target.result.slice(0, offset),
						curSize: offset,
						size: self.state.curFile.size,
						name: self.state.curFile.name
					});
					return;
				}
				chunkReaderBlock(offset, chunkSize, file);
			};

			chunkReaderBlock = (_offset, length, _file) => {
				if (_file.size < (length + _offset)) {
					length = _file.size -_offset;
				}
				const r = new FileReader();
				const blob = _file.slice(_offset, length + _offset);
				r.onload = readEventHandler;
				r.readAsBinaryString(blob);
			};

			chunkReaderBlock(offset, chunkSize, file);
		};
		try {
			uploadFile(evt[0]);
		} catch (e) {
			console.error(e.message);
		}
	}

	componentDidMount() {
		const self = this;
		this.setState({socket: socketIOClient('http://localhost:4001')}, () => {
			this.state.socket.on('PROGRESS', (data) => {
				self.setState({progress: data})
			});

			this.state.socket.on('UPLOAD_ERROR', err => {
				//alert(err)
			});

			this.state.socket.on('UPLOAD_SUCCESS', (fileName) => {
				msg('ok', `Файл ${fileName} загружен`);
			});

			this.state.socket.on('UPLOAD_FILTERED', (fileName) => {
				msg('err', `Файл ${fileName} не загружен`);
			});
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

//(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)

export default UploadFiles;
