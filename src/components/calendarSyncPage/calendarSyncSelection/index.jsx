if (typeof window !== 'undefined') {
    require('./style.scss');
}

const config = require('../../../../config');
import React from 'react';
import Collapse from 'react-collapse';
import { Button, Modal } from 'react-bootstrap';

import intercom from '../../../utils/intercom';

import venobox from 'venobox/venobox/venobox.min.js';

import getFacebookAuthUrl from '../../../utils/getFacebookAuthUrl';
import ConnectionCard from '../../connectionCard';
import FacebookIssueModal from '../../modals/facebookIssueModal';

export default React.createClass({
    getInitialState() {
        return {
            displayIcsForm: false,
            showCronofyModal: false,
            showFacebookModal: false
        };
    },
    componentDidMount() {
        $('.venobox').venobox();
    },
    linkFacebookClicked() {
        const url = getFacebookAuthUrl();
        const name = 'facebook_login';
        const specs = 'width=500,height=500';
        window.open(url, name, specs);
    },
    toggleModal() {
        const { user } = this.props;
        if (this.state.showCronofyModal && user) {
            intercom.trackEvent('Closed Cronofy Modal');
            intercom.update({ user_id: user.userId, email: user.email });
        }

        this.setState({ showCronofyModal: !this.state.showCronofyModal });
    },
    hitCronofy() {
        var child = window.open(this.props.authUrl, '_blank');
        var leftDomain = false;

        const interval = setInterval(function() {
            try {
                if (child.document.domain === document.domain) {
                    if (leftDomain && child.document.readyState === 'complete') {
                        child.close();
                        clearInterval(interval);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                } else {
                    // this code should never be reached,
                    // as the x-site security check throws
                    // but just in case
                    leftDomain = true;
                }
            } catch (e) {
                if (child.closed) {
                    clearInterval(interval);
                    return;
                }
                leftDomain = true;
            }
        }, 500);
    },
    render() {
        const { user, authUrl } = this.props;

        return (
            <div className="welcome-page-header">
                <h2 style={{ 'position': 'relative' }}>
                    <span style={{ 'padding-right': '10px' }}>
                        Sync your calendar to Event Calendar App
                    </span>{' '}
                    <span className="handshake handshake--medium">🤝</span>
                </h2>
                <div className="welcome-page-header__sub-text">
                    <p>Where are your events, or where will they be in the future?</p>
                </div>
                <div className="row">
                    <Modal show={this.state.showCronofyModal} onHide={this.toggleModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <span>You're about to be taken to our partner...</span>
                            </Modal.Title>
                        </Modal.Header>
                        <div className="col-md-12 connection-modal">
                            <div className="connection-modal__cronofy">
                                <img src="https://3o7nze1htecu8vh6nuko0m13-wpengine.netdna-ssl.com/wp-content/themes/cronofy-2015/images/cronofy_logo-wide-colour.svg" />
                            </div>
                            <div className="connection-modal__content">
                                <p>
                                    We use a third party service called <strong>Cronofy</strong> to
                                    connect Event Calendar App to your Google, Apple, or Outlook
                                    calendar. You will briefly be taken away from our site while you
                                    connect.
                                </p>
                                <p>Don't worry, you only have to do this once!</p>
                            </div>
                            {this.props.user && this.props.user.bigcommerceUser
                                ? <a
                                      target="_blank"
                                      onClick={this.hitCronofy}
                                      className="action full-width"
                                  >
                                      Connect
                                  </a>
                                : <a href={this.props.authUrl} className="action full-width">
                                      Connect
                                  </a>}
                        </div>
                    </Modal>

                    <FacebookIssueModal show={this.state.showFacebookModal} hide={() => {
                        this.setState({ showFacebookModal: false });
                    }}></FacebookIssueModal>

                    <ConnectionCard
                        mostPopular={true}
                        header={'Google, Apple, Outlook or Exchange (via Cronofy)'}
                        description={
                            'The simplest way to connect your calendar to Event Calendar App'
                        }
                    >
                        <a href="#" onClick={() => this.toggleModal()} className="button secondary">
                            📆 Connect
                        </a>
                    </ConnectionCard>

                    <ConnectionCard header={'Facebook'} description={'Use for connecting to Facebook events'}>
                        <a href="#" onClick={() => this.setState({showFacebookModal: true})} className="button danger">
                            Temporarily disabled
                        </a>
                    </ConnectionCard>

                    <ConnectionCard
                        header={'ICS'}
                        description={'Requires you to know the .ICS feed url of your calendar.'}
                    >
                        <a
                            href="#"
                            className="button secondary"
                            onClick={this.props.clickIcsConnect}
                        >
                            📆 Connect
                        </a>
                    </ConnectionCard>
                </div>
                <div className="row" style={{'margin-bottom': '38px', 'text-align': 'center'}}>
                    <div className="col-md-12">
                        <h3 style={{'border-top': '1px solid #c9c9c9', 'marginTop': '28px', 'padding-top': '33px'}}>Don't have a Calendar to sync to? 🤔</h3>
                        <div className="welcome-page-header__sub-text">
                            <p>Register for a free calendar at any of the main calendar providers</p>
                        </div>
                        <a target="_blank" href="https://www.google.com/calendar" className="create-calendar-with create-calendar-with--google">
                            <i className="fa fa-google" aria-hidden="true"></i> GOOGLE
                        </a>
                        <a target="_blank" href="https://www.icloud.com/calendar" className="create-calendar-with create-calendar-with--apple">
                            <i className="fa fa-apple" aria-hidden="true"></i> APPLE
                        </a>
                        <a target="_blank" href="https://office.live.com/start/Calendar.aspx" className="create-calendar-with create-calendar-with--outlook">
                            <i className="fa fa-windows" aria-hidden="true"></i> Outlook
                            </a>
                    </div>
                    <div className="col-md-12">
                        <h3 className="welcome-page-header__or">Or...</h3>
                    </div>
                </div>
                <div className="row" style={{'margin-bottom': '50px'}}>
                    <ConnectionCard header={'Manually add events'} description={'Use for manually adding your events into Event Calendar App'}>
                        <a href="#" className="button secondary" onClick={this.props.clickManualEvents}>
                            📆 Go
                        </a>
                    </ConnectionCard>
                </div>
            </div>
        );
    }
});
