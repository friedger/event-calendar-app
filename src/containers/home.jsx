import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';
import * as appActions from '../actions/index';

const config = require('../../config');
const Link = require('react-router').Link;

import Header from '../components/header';
import NewWidgetButton from '../components/newWidgetButton';
import WidgetButton from '../components/widgetButton';
import { Modal } from 'react-bootstrap';
import get from 'lodash.get';

const mapState = ({appState}) => {
    return {
        appState
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...widgetActions,
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    componentDidMount() {
        this.props.getWidgets();
        this.props.getUser();
    },
    render() {
        if (this.props.children) {
            return (
                <div style={{height: '100%'}}>{this.props.children}</div>
            )
        }

        return (
            <div style={{height: '100%'}}>
                <Modal show={this.props.appState.widgetCreationError} onHide={this.props.widgetErrorAcknowledged}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                Unable to add any more calendars
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            Your current plan does not allow any more calendars. Upgrade to add more.
                        </div>
                    </div>
                </Modal>
                <Header loggedIn={true} useFluidContainer={true}/>
                <div className="container-fluid" style={{marginTop: '50px'}}>
                    <div className="row" style={{padding: '0 30px'}}>
                        {this.props.appState.user && <NewWidgetButton weeblyUser={get(this, 'props.appState.user.weeblyUser')} onClick={this.props.postWidgets}></NewWidgetButton>}
                        {this.props.appState.widgets.map((widget, index, fullArr) => {
                            if (fullArr.length === 1) {
                                return <WidgetButton widget={widget} number={index + 1}></WidgetButton>
                            }
                            return <WidgetButton deleteAction={this.props.deleteWidget} widget={widget} number={index + 1}></WidgetButton>
                        })}
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
