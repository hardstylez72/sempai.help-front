import React, { Component, } from 'react';
import { Icon, } from 'antd';
import { request, } from '../../store/api/request';
import './RefreshButton.css';
import { playerActions, } from '../../store/player/actions';
import store from '../../store/rootStore';
import { Tooltip, OverlayTrigger, } from 'react-bootstrap';

const getFavState = (error, loading, clickHandler) => {
    if (loading) {
        return <Icon
            type='loading'
        />;
    }

    return  <Icon type='reload' onClick={clickHandler}/>;
};

class RefreshButton extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            error  : false,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({ loading: true, });
        request(window.api.REFRESH_FOLDER_STRUCT)
            .then(() => {
                this.setState({ loading: false, });
                store.dispatch(playerActions.getFolderStruct(null))
                    .then(data => store.dispatch(playerActions.setStruct(data)));
            })
            .catch(() => {
                this.setState({ loading: false, });
            });
    }

    render() {
        const tooltip =
			<Tooltip id='tooltip'>
			    <strong>Обновить контент</strong>
			</Tooltip>;
        const { loading, error, } = this.state;

        return (
            <div className={'refresh-button'}>
                <OverlayTrigger placement='right' overlay={tooltip}>
                    {getFavState(
                        error,
                        loading,
                        this.clickHandler
                    )}
                </OverlayTrigger>
            </div>

        );
    }
}


export default RefreshButton;
