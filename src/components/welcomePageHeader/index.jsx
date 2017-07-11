if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import Collapse from 'react-collapse';
import {Button, Modal} from 'react-bootstrap';

import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import intercom from '../../utils/intercom';

import venobox from 'venobox/venobox/venobox.min.js';

export default React.createClass({
    getInitialState() {
        return {
            displayIcsForm: false,
            showCronofyModal: false
        }
    },
    componentDidMount() {
        $('.venobox').venobox();
    },
    toggleModal() {
        const {user} = this.props;
        if (this.state.showCronofyModal && user) {
            intercom.trackEvent('Closed Cronofy Modal');
            intercom.update({user_id: user.userId, email: user.email})
        }

        this.setState({showCronofyModal: !this.state.showCronofyModal});
    },
    hitCronofy() {
        var child = window.open(this.props.authUrl, "_blank");
        var leftDomain = false;

        const interval = setInterval(function() {
            try {
                if (child.document.domain === document.domain) {
                    if (leftDomain && child.document.readyState === "complete") {
                        child.close();
                        clearInterval(interval);
                        window.location.reload();
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

        const {user, authUrl} = this.props;

        return (
            <div className="welcome-page-header">
                <h2>Link your calendar to Event Calendar App</h2>
                <div className="welcome-page-header__sub-text">
                <p>Where are your events, or where will they be in the future?</p>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="welcome-card welcome-card--primary">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="welcome-card__header welcome-card--primary__header">
                                        Google, Apple, Outlook or Exchange
                                    </div>
                                    <div className="welcome-card__description welcome-card--primary__description">
                                        <p>The simplest way to connect your calendar to Event Calendar App</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div>
                                        <a href='#' onClick={() => this.toggleModal()} className="welcome-card__connect welcome-card--primary__connect">Connect</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="welcome-card__recommended">
                            <p>Most Popular!</p>
                        </div>
                    </div>

                    <Modal show={this.state.showCronofyModal} onHide={this.toggleModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><span>You're about to be taken to our partner...</span></Modal.Title>
                          </Modal.Header>
                        <div className="col-md-12 connection-modal">
                            <div className="connection-modal__cronofy">
                                <img src="https://3o7nze1htecu8vh6nuko0m13-wpengine.netdna-ssl.com/wp-content/themes/cronofy-2015/images/cronofy_logo-wide-colour.svg" />
                            </div>
                            <div className="connection-modal__content">
                                <p>We use a third party service called <strong>Cronofy</strong> to connect Event Calendar App to your Google, Apple, or Outlook calendar. You will briefly be taken away from our site while you connect.</p>
                                <p>Don't worry, you only have to do this once!</p>
                            </div>
                            {this.props.user && this.props.user.bigcommerceUser ? <a target="_blank" onClick={this.hitCronofy} className="action full-width">Connect</a> : <a href={this.props.authUrl} className="action full-width">Connect</a>}
                        </div>
                    </Modal>

                    <div className="col-md-12">
                        <div className="welcome-card">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="welcome-card__header">
                                        ICS Feed
                                    </div>
                                    <div className="welcome-card__description">
                                        <p>Use for connecting to <strong>Facebook</strong> or other third party providers.</p>
                                        <p>Requires you to know the .ICS feed url of your calendar.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div>
                                        <a href="#" className="welcome-card__connect" onClick={this.props.clickIcsConnect}>Connect</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
