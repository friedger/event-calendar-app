import React from 'react';
import ga from 'react-ga';

import FirstTimeLinkMessage from '../firstTimeLinkMessage';
import BeginTrial from '../beginTrial';
import EventCal from '../eventCal';
import WelcomePageHeader from '../welcomePageHeader';
import AdminSettingsPanel from '../../containers/adminSettingsPanel';
import LinkCalendar from '../../containers/LinkCalendar';
const Link = require('react-router').Link;

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
                                    <span><Link className="start-trial" to="/dashboard/plans">Add this calendar to your website</Link></span>
                                </div>
                                <EventCal userId={this.props.user.userId} />
                                <hr />
                                <p>Once you&#39;re ready to add the calendar to your site, follow the link below to begin your trial.   </p>
                                <Link className="start-trial start-trial--smaller-margin" to="/dashboard/plans">Start your free trial</Link>
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
