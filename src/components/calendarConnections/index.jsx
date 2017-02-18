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
                    <div className="col-md-6">
                        {!this.state.addCalendarSelected && <button className='action full-width' onClick={() => this.setState({addCalendarSelected: true})}>Add calendar</button>}
                    </div>
                </div>
                {this.state.addCalendarSelected && <AddIcsCalendarForm calendarAdded={this.props.calendarAdded}/>}
            </div>
        )
    }
})
