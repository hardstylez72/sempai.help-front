import React, {Component} from 'react';
import {getFolderStruct} from '../transport/addLinkTr.jsx';
import {Drawer, Form, Button, Col, Row, Input, Select, message} from 'antd';
import {Treebeard} from 'react-treebeard';
import ReactPlayer from 'react-player';
import {Base64} from 'js-base64';

import './Music.css';

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

class music extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
            folderStruct: {},
            nextTrack: '',
			track: {
                paying: '',
                next: '',
                prev: '',
                currentPath: '',
                playingURL: ''
            },
			play: false,
            nowPlaying: '',
        
		};

		this.onToggle = this.onToggle.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
        this.currentMediaFileEndedPlaying = this.currentMediaFileEndedPlaying.bind(this);
        this.getNextTrack = this.getNextTrack.bind(this);
        this.getWideDash = this.getWideDash.bind(this);
	}

	render() {
		return (
			<div>
				<Treebeard data={this.state.folderStruct} onToggle={this.onToggle} />
                <ReactPlayer url={`/radio/${this.state.track.playingURL}`} 
                onEnded={this.currentMediaFileEndedPlaying} 
                playing={this.state.play} 
                controls 
                volume="1" />
			</div>
		);
	}

	clickHandle(e) {
		console.log(e);
	}
	componentDidMount() {
		(async () => {
			try {
				const folderStruct = await getFolderStruct('/music/');
				this.setState({folderStruct: folderStruct});
			} catch (err) {
				msg('err', 'Ошибка при загрузке данных с сервера');
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
		if ((node.type === 'file' && node.extension === '.flac') || node.extension === '.mp4') {
			console.log(node.path + node.name);
			const jsonPath = JSON.stringify({path: node.path});
			this.setState({track: {
                playingURL: Base64.encodeURI(jsonPath),
                playing: node.name,
                currentPath: node.path,
            }});
            const self = this;
            this.getNextTrack(node.name, (name => {
                self.setState({nextTrack: name});
                console.log("nexttarck == ", name);
            }));
            this.setState({play: true});
		}
    }

    currentMediaFileEndedPlaying() {
        const jsonPath = JSON.stringify({path: this.state.nextTrack.path});
        this.setState({track: {
            playingURL: Base64.encodeURI(jsonPath),
        }});
        this.setState({play: true});
    }

    getWideDash = (count) => {
        let result = '|'
        for (let index = 0; index < count; index++) {
            result += '__';
        }
        return result;
    }
    getNextTrack(trackName, cb) {
        if (trackName == null) {
            return;
        }

        let baseNode = this.state.folderStruct;
        let isPlayingTrackFound = false;
        let isNextTrackFound = false;
    
        (function searchInTree(node) {
            if (isNextTrackFound) {
                return;
            }
            if (node.children) {
                for (let index = 0; index < node.children.length; index++) {
                    let el = node.children[index];
                    if (isNextTrackFound) {
                        break;
                    }
                    if (isPlayingTrackFound && el.type === 'file' && (el.extension === '.flac' || el.extension === '.mp3')) {
                        isNextTrackFound = true;
                        cb(el);
                        return;
                    }
                    if (el.name === trackName) {
                        console.log('trackIsFound');
                        isPlayingTrackFound = true;
                    } 
                        searchInTree(el);
                }
            }
        })(baseNode);
    }
    
    getPrevTrack() {
        return 0;
    }
}

export default music;
