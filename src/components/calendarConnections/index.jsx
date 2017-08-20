if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import AddIcsCalendarForm from '../addIcsCalendarForm';

import Loader from 'react-loader';


export default React.createClass({
    getInitialState() {
        return {addCalendarSelected: false, displayError: false};
    },
    deleteCalendar(connection) {
        if (this.props.connections.length === 1) {
            return this.setState({displayError: true});
        }

        if (connection.calendarId) {
            return this.props.deleteCalendar({calendarId: connection.calendarId});
        }

        if (connection.cronofyAccessTokenId) {
            return this.props.deleteCalendar({cronofyAccessTokenId: connection.cronofyAccessTokenId});
        }
    },
    render() {
        return (
            <div className="calendar-connections">
                <p className="dashboard-header dashboard-header--right">Calendar connections</p>
                <button className='default' onClick={this.props.toggleConnectionsScreen}><i className="fa fa-caret-left" aria-hidden="true"></i> Back to settings</button>
                <p className="title">Event Calendar App is currently connected to:</p>
                <div className="row">
                    <div className="col-md-12">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Connection Method</th>
                                    <th></th>
                                </tr>
                                {this.props.connections.map((connection, index) => {
                                    return (<tr key={index} className={connection.loading && 'loading'}>
                                        <td>{connection.name}</td>
                                        <td>{connection.type}</td>
                                        <td className="delete">
                                            {connection.loading && <Loader type='spin' color='#000' width={2} radius={3} />}
                                            {!connection.loading && <span onClick={() => {this.deleteCalendar(connection)}} className="remove"><i className="fa fa-trash" aria-hidden="true"></i></span>}
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.displayError && <p className="validation-message">You cannot delete the only calendar that you are conncected to.</p>}
                <div className="row">
                    <div className="col-md-12">
                        <strong>Connect additional calendars 🤘</strong>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="welcome-card">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="welcome-card__header welcome-card__header">
                                        <span>Google</span>, <span>Apple</span>, <span>Outlook</span> or <span>Exchange</span>
                                    </div>
                                    <div className="welcome-card__description welcome-card__description">
                                        <p>The simplest way to connect your calendar to Event Calendar App</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div>
                                        <a href='#' onClick={() => this.toggleModal()} className="welcome-card__connect">Connect</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="welcome-card">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="welcome-card__header">
                                        Facebook
                                    </div>
                                    <div className="welcome-card__description">
                                        <p>Use for connecting to <strong>Facebook</strong>.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div>
                                        <a href="#" onClick={this.linkFacebookClicked} className="welcome-card__connect">Connect</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="welcome-card">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="welcome-card__header">
                                        ICS Feed
                                    </div>
                                    <div className="welcome-card__description">
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
})
