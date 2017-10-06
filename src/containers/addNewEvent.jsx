import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as manualEventActions from '../actions/manualEventActions';
import NewPost from '../components/newPost';

const mapState = ({ appState, eventState }) => {
    return {
        appState,
        eventState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...manualEventActions
        },
        dispatch
    );
};

const component = React.createClass({
    render() {
        return (<NewPost postManualEvent={this.props.postManualEvent}/>);
    }
});

export default connect(mapState, mapDispatch)(component);
