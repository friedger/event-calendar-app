import React from 'react';
import { Modal } from 'react-bootstrap';
import CalendarCodetextArea from '../calendarCodetextArea';
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
                {this.props.userIsAGuest && (
                    <Link
                        className="dashboard-settings__embed button action action--skinny"
                        to="/account"
                    >
                        <i className="fa fa-code" aria-hidden="true" /> Embed code
                    </Link>
                )}
                {!this.props.userIsAGuest && (
                    <a
                        onClick={() => this.setState({ modalOpen: true })}
                        className="dashboard-settings__embed button action action--skinny"
                    >
                        <i className="fa fa-code" aria-hidden="true" /> Embed code
                    </a>
                )}
                <Modal
                    show={this.state.modalOpen}
                    onHide={() => this.setState({ modalOpen: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Add the calendar to your website</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            <CalendarCodetextArea
                                eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                userId={this.props.userId}
                                shopifyUser={this.props.shopifyUser}
                            />
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }
});