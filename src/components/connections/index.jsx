require('./style.scss');
import React from 'react';
import Connection from '../connection';
const config = require('../../../config');
import AddIcsModal from '../modals/addIcsModal';
import CronofyRedirectModal from '../modals/cronofyRedirectModal';
import CronofyDisconnectModal from '../modals/cronofyDisconnectModal';
import WelcomeCard from '../welcomeCard';
import capitalize from 'capitalize';

export default React.createClass({
    getInitialState() {
        return {
            showCronofyModal: false,
            showCronofyDisconnectModal: false,
            icsModal: false
        };
    },
    deleteCalendarMethods() {
        return {
            ics: (connection) => this.props.deleteCalendar({ calendarId: connection.calendarId }),
            facebook: (connection) => this.props.deleteCalendar({ calendarId: connection.calendarId }),
            cronofy: false
        };
    },
    linkFacebookClicked() {
        const url = `${config.apiUrl}/facebook`;
        const name = 'facebook_login';
        const specs = 'width=500,height=500';
        window.open(url, name, specs);
    },
    toggleModal() {
        this.setState({ showCronofyModal: !this.state.showCronofyModal });
    },
    toggleDisconnectModal() {
        this.setState({ showCronofyDisconnectModal: !this.state.showCronofyDisconnectModal });
    },
    toggleIcsModal() {
        this.setState({ icsModal: !this.state.icsModal });
    },
    render() {
        return (
            <div style={{ padding: '0 20px 20px 20px' }}>
                <CronofyRedirectModal
                    show={this.state.showCronofyModal}
                    hide={this.toggleModal}
                    user={this.props.user}
                    authUrl={this.props.authUrl}
                />
                <CronofyDisconnectModal
                    show={this.state.showCronofyDisconnectModal}
                    hide={this.toggleDisconnectModal}
                    onDisconnct={() => {
                        this.props.disconnectCronofy(this.props.cronofyConnection);
                        this.toggleDisconnectModal();
                    }}
                />
            <AddIcsModal hide={this.toggleIcsModal} show={this.state.icsModal} icsAddedAction={this.props.icsAddedAction} />
                <div className="section-header">
                    <h2>📅 Calendar Connections</h2>
                    <p>We currently source your calendars from the following places:</p>
                </div>
                {Object.keys(this.props.groupedConnections).map(connectionName => {
                    return <Connection
                        name={capitalize(connectionName)}
                        connections={this.props.groupedConnections[connectionName]}
                        deleteCalendar={this.deleteCalendarMethods()[connectionName]}
                    />;
                })}
                <div className="section-header">
                    <h3>🙌 Add a new calendar source</h3>
                    <p>Where else are your events located?</p>
                </div>
                <div className="row">
                    <WelcomeCard header={'Google, Apple, Outlook or Exchange (via Cronofy)'} description={'The simplest way to connect your calendar to Event Calendar App'}>
                        {!this.props.cronofyConnection &&
                            <a
                                href="#"
                                onClick={() => this.toggleModal()}
                                className="button secondary"
                            >
                                Connect
                            </a>}
                        {this.props.cronofyConnection &&
                            <a
                                href="#"
                                onClick={() => this.toggleDisconnectModal()}
                                className="button danger"
                            >
                                Disconnect
                            </a>}
                    </WelcomeCard>
                    <WelcomeCard header={'Facebook'} description={'Use for connecting to Facebook'}>
                        <a
                            href="#"
                            onClick={this.linkFacebookClicked}
                            className="button secondary"
                        >
                            Connect
                        </a>
                    </WelcomeCard>
                    <WelcomeCard header={'ICS'} description={'Requires you to know the .ICS feed url of your calendar.'}>
                        <a
                            href="#"
                            className="button secondary"
                            onClick={this.toggleIcsModal}
                        >
                            Connect
                        </a>
                    </WelcomeCard>
                </div>
            </div>
        );
    }
});