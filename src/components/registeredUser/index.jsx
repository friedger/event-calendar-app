import React from 'react';
import ga from 'react-ga';

import FirstTimeLinkMessage from '../firstTimeLinkMessage';
import BeginTrial from '../beginTrial';
import EventCal from '../eventCal';
import WelcomePageHeader from '../welcomePageHeader';
import AdminSettingsPanel from '../../containers/adminSettingsPanel';
import LinkCalendar from '../../containers/LinkCalendar';

export default React.createClass({
    _fireGaEvent() {
        ga.event({
          category: 'User',
          action: 'Clicked link calendar'
        });
    },
    render() {
        const {user, authUrl, connections} = this.props;
        return (
            <div>
                {connections && connections.length > 0 ?
                    <div>
                        <div className="col-sm-5 calendar-settings col-sm-push-7">
                            <AdminSettingsPanel />
                        </div>
                        <div className="col-sm-7 col-sm-pull-5">
                            <div>
                                <div className="dashboard-header dashboard-header--left">
                                    <span>Live calendar</span>
                                </div>
                                <EventCal userId={this.props.user.userId} />
                                <hr />
                                <BeginTrial testMode={this.props.testMode} user={user} submitPaymentAction={this.props.submitPaymentAction}/>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <LinkCalendar authUrl={authUrl}/>
                    </div>
                }
            </div>
        )
    }
});
