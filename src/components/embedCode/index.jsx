import {Input, Row, Col} from 'react-bootstrap';
import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import CalendarCodetextArea from '../calendarCodetextArea';
import CopyToClipboard from 'react-copy-to-clipboard';
const Link = require('react-router').Link;

export default React.createClass({
    getInitialState() {
        return {
            modalOpen: false
        };
    },
    render() {
        return (
            <span>
                {this.props.userIsAGuest && <Link className="dashboard-settings__embed button action action--skinny" to="/dashboard/plans"><i className="fa fa-code" aria-hidden="true"></i> Embed code</Link>}
                {!this.props.userIsAGuest && <a onClick={() => this.setState({modalOpen: true})} className="dashboard-settings__embed button action action--skinny"><i className="fa fa-code" aria-hidden="true"></i> Embed code</a>}
                <Modal show={this.state.modalOpen} onHide={() => this.setState({modalOpen: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Add the calendar to your website</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            <CalendarCodetextArea userId={this.props.userId} shopifyUser={this.props.shopifyUser}></CalendarCodetextArea>
                        </div>
                    </div>
                </Modal>
            </span>
        )
    }
});
