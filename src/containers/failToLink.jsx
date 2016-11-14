import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
const Link = require('react-router').Link;
import Header from '../components/header';

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
                        <h1>We need to link your calendar</h1>
                        <p>If you don't link a calendar to Event Calendar App, then there will be nothing to display on your calendar. :(</p>
                        <p>Calendar accounts with all the major providers (Google, Outlook and Apple) are completly free. However, there's a good chance you already have one.</p>
                        <ul>
                            <li><a target="_blank" href="https://www.icloud.com/#calendar">Register for a <strong>Apple</strong> Calendar</a></li>
                            <li><a target="_blank" href="https://www.google.com/calendar">Register for a <strong>Google</strong> Calendar</a></li>
                            <li><a target="_blank" href="https://office.live.com/start/Calendar.aspx?omkt=en-US">Register for a <strong>Outlook</strong> Calendar</a></li>
                        </ul>
                        <p>Once you've got your calendar account ready, <strong>try linking your calendar again</strong>:</p>
                        <a href={getCronofyAuthUrl()} onClick={this._fireGaEvent} className="start-trial">Link my calendar</a>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
