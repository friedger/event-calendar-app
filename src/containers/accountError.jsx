import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
const Link = require('react-router').Link;
import Header from '../components/header';
import AccountErrorMessage from '../components/errorPages/accountErrorMessage';

const mapState = ({appState}) => {
    return {appState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const headerHeight = 70;

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div style={{height: '100%'}}>
                <Header loggedIn={true}/>
                <div className="container" style={{height: 'calc(100% - 70px)'}}>
                    <div className="col-md-12" style={{height: `calc(100% - ${headerHeight}px)`}}>
                        <AccountErrorMessage/>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
