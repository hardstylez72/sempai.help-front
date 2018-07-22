import React, { Component } from 'react';
import { Media, Player, controls } from 'react-media-player';
import {getMusic} from '../transport/addLinkTr.jsx';
import {Drawer, Form, Button, Col, Row, Input, Select, message} from 'antd';
import {Treebeard} from 'react-treebeard';
const { PlayPause, MuteUnmute, Progress, SeekBar } = controls;

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
			data: {},

		};

        this.onToggle = this.onToggle.bind(this);
	}
    componentDidMount() {
		(async () => {
			try {
				const articles = await getMusic('/music/');
				this.setState({data: articles});
			} catch (err) {
				msg('err', 'Ошибка при загрузке данных с сервера');
			}
		})();
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
	render() {
		return (
            <Treebeard
            data={this.state.data}
            onToggle={this.onToggle}
        />
		);
	}
}

export default music;
