import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as facebookActions from '../actions/facebookActions';
import Header from '../components/header';
import FacebookSelect from '../components/facebookAuth/facebookSelect';

const mapState = ({ facebookState }) => {
    return {
        facebookState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...facebookActions
        },
        dispatch
    );
};

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillUnmount() {},
    componentDidMount() {
        this.props.getFacebookPages();
    },
    pageSelectionSuccess() {
        this.context.router.push('/editor');
    },
    render() {
        return (
            <div style={{ background: '#f5f5f5', height: '100%' }}>
                <Header loggedIn={true} />
                <FacebookSelect postFacebookCalendar={this.props.postFacebookCalendar} pageSelectionSuccess={this.pageSelectionSuccess} pages={this.props.facebookState && this.props.facebookState.pages}></FacebookSelect>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
