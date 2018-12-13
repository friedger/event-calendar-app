require('./style.scss');
import React from 'react';
import Connection from '../connection';
import AddIcsModal from '../modals/addIcsModal';
import CronofyRedirectModal from '../modals/cronofyRedirectModal';
import CronofyDisconnectModal from '../modals/cronofyDisconnectModal';
import ConnectionCard from '../connectionCard';
import capitalize from 'capitalize';
import getFacebookAuthUrl from '../../utils/getFacebookAuthUrl';

const Connections = React.createClass({
    getInitialState() {
        return {
            showCronofyModal: false,
            showCronofyDisconnectModal: false,
            icsModal: false
        };
    },
    deleteCalendarMethods() {
        return {
            ics: connection => this.props.deleteCalendar({ calendarId: connection.calendarId }),
            facebook: connection =>
                this.props.deleteCalendar({ calendarId: connection.calendarId }),
            cronofy: false
        };
    },
    linkFacebookClicked() {
        const url = getFacebookAuthUrl();
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
            <div className={`row ${this.props.className ? this.props.className : ''}`} style={{ paddingLeft: '30px', paddingRight: '30px' }}>
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
                <AddIcsModal
                    hide={this.toggleIcsModal}
                    show={this.state.icsModal}
                    icsAddedAction={this.props.icsAddedAction}
                />
                {Object.keys(this.props.groupedConnections).length > 0 && (
                    <div className="section-header col-md-12">
                        <h2>📅 Calendar Connections</h2>
                        <p>We currently source your calendars from the following places:</p>
                    </div>
                )}
                {Object.keys(this.props.groupedConnections).map((connectionName, index) => {
                    return (
                        <Connection
                            name={capitalize(connectionName)}
                            key={index}
                            connections={this.props.groupedConnections[connectionName]}
                            deleteCalendar={this.deleteCalendarMethods()[connectionName]}
                        />
                    );
                })}
                <div className="section-header col-md-12">
                    <h2>🙌 Add a new calendar source</h2>
                    <p>Where else are your events located?</p>
                </div>
                <ConnectionCard
                    header={'Google, Apple, Outlook or Exchange (via Cronofy)'}
                    description={'The simplest way to connect your calendar to Event Calendar App'}
                >
                    {!this.props.cronofyConnection && (
                        <a href="#" onClick={() => this.toggleModal()} className="button secondary">
                            Connect
                        </a>
                    )}
                    {this.props.cronofyConnection && (
                        <a
                            href="#"
                            onClick={() => this.toggleDisconnectModal()}
                            className="button danger"
                        >
                            Disconnect
                        </a>
                    )}
                </ConnectionCard>
                <ConnectionCard
                    header={'ICS'}
                    description={'Requires you to know the .ICS feed url of your calendar.'}
                >
                    <a href="#" className="button secondary" onClick={this.toggleIcsModal}>
                        Connect
                    </a>
                </ConnectionCard>
            </div>
        );
    }
});

export default Connections;
