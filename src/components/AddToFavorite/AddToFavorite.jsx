import React, { Component } from 'react';
import {Icon} from 'antd';
import {request} from '../../store/api/request'
import './AddToFavorite.css'

const getFavState = (included, loading, handlerAdd, handlerDelete) => {
	if (loading) {
		return <Icon
			type="loading"
			className={'loading-fav-button'}
		/>
	}
	return included ? (
		<Icon
			onClick={handlerDelete}
			type="check-circle"
			className={'delete-to-favorite-btn'}
		/>
	) : (
		<Icon
			onClick={handlerAdd}
			type="plus-circle"
			className={'add-to-favorite-btn'}
		/>
	)
};

class AddToFavorite extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			loading: false,
			included: false,
			track: this.props.track,
			changedTrack: false
		};
		//this.onAddToFavoriteClick = this.onAddToFavoriteClick.bind(this);
	}

	render() {
		const { loading, included } = this.state;
		return(
			<div>
				{getFavState(
					included,
					loading,
					this.onAddToFavoriteClick.bind(this),
					this.onDeleteToFavoriteClick.bind(this)
				)}
			</div>

		);
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.track !== prevProps.track) {
			const {track} = this.props;
			if (!this.state.loading)
			(async () => {
				try {
					this.setState({loading: true, included: false});
					const { included } = await request(window.api.CHECK_FAVORITE, track);
					this.setState({loading: false, included: included});
				} catch (err) {
					this.setState({loading: false});
				}

			})();
		}
	}

	onDeleteToFavoriteClick = async () => {
		try {
			const {track} = this.props;
			this.setState({loading: true});
			await request(window.api.DELETE_FAVORITE, track);
			this.setState({loading: false, included: false});
		} catch (err) {
			this.setState({loading: false});
		}

	};
	onAddToFavoriteClick = async () => {
		try {
			const {track} = this.props;
			this.setState({loading: true});
			await request(window.api.CHANGE_FAVORITE, track);
			this.setState({loading: false, included: true});
		} catch (err) {
			this.setState({loading: false});
		}

	};
}



export default AddToFavorite;
