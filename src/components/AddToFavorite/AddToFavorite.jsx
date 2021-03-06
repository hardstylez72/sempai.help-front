import React, { Component, } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Icon, } from 'antd';
import { request, } from '../../store/api/request';
import './AddToFavorite.css';
import { playerActions, } from '../../store/player/actions';
import store from '../../store/rootStore';


const getFavState = (included, loading, handlerAdd, handlerDelete) => {
    if (loading) {
        return <Icon
            type='loading'
            className={'loading-fav-button'}
        />;
    }

    return included ?
        <Icon
            onClick={ handlerDelete }
            type='check-circle'
            className={ 'delete-to-favorite-btn' }/>	 :
        <Icon
            onClick={ handlerAdd }
            type='plus-circle'
            className={ 'add-to-favorite-btn' }/>;
};

class AddToFavorite extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading     : false,
            included    : false,
            track       : this.props.track,
            changedTrack: false,
        };
    }

    render() {
        const { loading, included, } = this.state;

        return (
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
            const { track, } = this.props;

            if (!this.state.loading) {
                (async () => {
                    try {
                        this.setState({
                            loading : true,
                            included: false,
                        });
                        const { included, } = await request(window.api.CHECK_FAVORITE, track);

                        this.setState({
                            loading: false,
                            included,
                        });
                    } catch (err) {
                        this.setState({ loading: false, });
                    }
                })();
            }
        }
    }

	onDeleteToFavoriteClick = async () => {
	    try {
	        const { track, } = this.props;

	        this.setState({ loading: true, });
	        await request(window.api.DELETE_FAVORITE, track);
	        this.setState({
	            loading : false,
	            included: false,
	        });
	    } catch (err) {
	        this.setState({ loading: false, });
	    }
	};

	onAddToFavoriteClick = async () => {
	    const { track, } = this.props;

	    this.setState({ loading: true, });
	    console.log(this.props);
	    await request(window.api.CHANGE_FAVORITE, track).catch(err => {
	        this.setState({ loading: false, });
	        console.error(err);
	    });
	    store.dispatch(playerActions.addToFavoriteStruct());
	    this.setState({
	        loading : false,
	        included: true,
	    });
	};
}


export default connect(
    state => ({ player: state.player, }),
    dispatch => ({}),
)(AddToFavorite);
