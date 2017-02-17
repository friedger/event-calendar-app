import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';

import Header from '../components/header';
import WelcomePageHeader from '../components/welcomePageHeader';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';

const mapState = ({appState}) => {
    return {
        appState
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions,
        ...calendarActions
    }, dispatch);
}


const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            displayConnectionsScreen: false,
            addCalendarSelected: false
        }
    },
    render() {
        return (
            <div>
                <Header useFluidContainer={false} loggedIn={true}/>
                <div className='container'>
                    <WelcomePageHeader />
                    <a href={getCronofyAuthUrl()} className="start-trial">Link my calendar</a>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
