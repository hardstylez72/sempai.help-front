import React, {Component} from 'react';
import AddToFavorite from '../AddToFavorite/AddToFavorite';
import { Icon } from 'antd';
import './TrackCard.css'

class TrackCard extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	render() {
		const { player } = this.props;
		return (
		<div className={'cover-contaiter'}>
			<div>
				<div className={'cover--img-container'}>
					{
						player.cover ? (
							<img className={'cover-img'} src={player.cover}/>
						) : (<span/>)
					}
				</div>
				<div className={'track-name-info'}>
					<b>Трек:</b> {player.nowPlayingName ? player.nowPlayingName : ''}
				</div>
				<div className={'track-card-controls-container'}>
					<div className={'tarck-card-controls'}>
						<AddToFavorite track={player.nowPlayingName}/>
						<Icon
							onClick={this.onDownloadClickHandler.bind(this)}
							type="download"
							style={{fontSize: 20, color: '#08c'}}
						/>
					</div>
				</div>
			</div>
		</div>
		)
	}
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
}



export default TrackCard;