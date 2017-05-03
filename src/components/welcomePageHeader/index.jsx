if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import Collapse from 'react-collapse';
import {Modal, Button} from 'react-bootstrap';

import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';

import venobox from 'venobox/venobox/venobox.min.js';

export default React.createClass({
    getInitialState() {
        return {
            displayIcsForm: false
        }
    },
    componentDidMount() {
        $('.venobox').venobox();
    },
    render() {

        const {user, authUrl} = this.props;

        return (
            <div className="welcome-page-header">
                <h2>Get started with Event Calendar App</h2>
                <div className="welcome-page-header__sub-text">
                <p>We connect to your existing calendar tools to create your <strong>new event calendar.</strong></p>
                <p>How would you like to connect your existing calendar to Event Calendar App?</p>
                </div>
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
                        <i className="fa fa-video-camera" aria-hidden="true"></i> <a className="venobox" data-autoplay="true" data-vbtype="video" href="https://www.youtube.com/embed/FCjGqazRmD0">If you like videos, we have made a short video fully explaining this step.</a>
                        <h3>FAQ</h3>
                            Dont have an existing calendar?
                            <div className="welcome-page-header__collapse-content">
                                <p>If you have a Google, Outlook or Apple account then you have a calendar. You may have just never used it. Otherwise, signing up for these services is completely free.</p>
                                <p>You can read about why we require you to have a calendar, and how to get one yourself <a href="https://eventcalendarapp.com/support/2017/02/18/why-do-i-have-to-connect-my-calendar-to-event-calendar-app/">here.</a></p>
                            </div>
                        <div>
                        <a target="_blank" href="https://eventcalendarapp.com/support/2017/02/18/ways-of-connecting-your-calendar/">Want more information about this step?</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
