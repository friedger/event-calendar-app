if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';

export default React.createClass({
    getInitialState() {
        return {
            displayIcsForm: false
        }
    },
    render() {

        const {user, authUrl} = this.props;

        return (
            <div className="welcome-page-header">
                <h2>Get started with Event Calendar App</h2>
                <p>How would you like to link your calendar to Event Calendar App?</p>
                <div className="row">
                    <div className="col-md-4">
                        <div className="welcome-card welcome-card--primary">
                            <div className="welcome-card__header welcome-card--primary__header">
                                Option 1 (Cronofy*)
                            </div>
                            <div className="welcome-card__description welcome-card--primary__description">
                                <p>The <strong>easiest</strong> way to link to your calendar.</p>
                                <p>Works with <strong>Apple, Google</strong> and <strong>Outlook</strong> calendars.</p>
                            </div>
                            <div>
                                <a href={this.props.authUrl} className="welcome-card__connect welcome-card--primary__connect">Connect</a>
                            </div>
                            <div className="welcome-card__cronofy-desription">*Cronofy is a third party service that we use to connect to your calendar. You will be briefly taken to another site when you click connect.</div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="welcome-card">
                            <div className="welcome-card__header">
                                Option 2 (ICS Feed)
                            </div>
                            <div className="welcome-card__description">
                                <p>Use for connecting to <strong>Facebook</strong> or other third party providers.</p>
                                <p>Requires you to know the .ICS feed url of your calendar.</p>
                            </div>
                            <div>
                                <a href="#" className="welcome-card__connect" onClick={this.props.clickIcsConnect}>Connect</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <a href="#">Want more information about this step?</a>
                    </div>
                </div>
            </div>
        )
    }
});
