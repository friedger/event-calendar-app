import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import { Link } from "react-router-dom";
import Header from '../components/header';
import { withRouter } from "react-router-dom";

import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';

const mapState = ({appState}) => {
    return {appState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div>
                <Header loggedIn={true}/>
                <div className="container">
                    <div className="col-md-12">
                        <h2 style={{'fontWeight': 'bold'}}>We need to connect to your calendar :(</h2>
                        <p>You can read more about why we need to connect to a calendar <a target="_blank" href="https://support.eventcalendarapp.com/connecting-your-calendar-events-to-event-calendar-app/why-do-i-have-to-connect-my-calendar-to-event-calendar-app">here</a>.</p>
                        <p>Once you've got your calendar account ready, <strong>try linking your calendar again.</strong></p>
                        <a href='#' onClick={() => {this.props.history.push('link-calendar')}} className="start-trial">Back to link options</a>
                    </div>
                </div>
            </div>
        )
    }
});

export default withRouter(connect(mapState, mapDispatch)(component));
