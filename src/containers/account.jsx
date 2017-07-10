import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';

const config = require('../../config');
const Link = require('react-router').Link;
import Account from '../components/account';

import Header from '../components/header';

const mapState = ({appState}) => {
    return {
        appState
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...widgetActions
    }, dispatch);
}

const component = React.createClass({
    componentDidMount() {
    },
    render() {
        return (
            <div style={{height: '100%', background: '#f5f5f5', overflow: 'auto'}}>
                <Header loggedIn={true} useFluidContainer={true}/>
                <div className="container" style={{marginTop: '50px', marginBottom: '50px'}}>
                    <div className="row">
                        <Account></Account>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
