import React from 'react';
import { Modal } from 'react-bootstrap';
import CalendarCodetextArea from '../calendarCodeTextArea';
import { Link } from "react-router-dom";

export default React.createClass({
    getInitialState() {
        return {
            modalOpen: this.props.modalOpen
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
                        <i className="fa fa-code" aria-hidden="true" /> Add to your website
                    </Link>
                )}
                {!this.props.userIsAGuest && (
                    <a
                        onClick={() => this.setState({ modalOpen: true })}
                        className="dashboard-settings__embed button action action--skinny"
                    >
                        <i className="fa fa-code" aria-hidden="true" /> Add to your website
                    </a>
                )}
                <Modal
                    show={this.state.modalOpen}
                    onHide={() => this.setState({ modalOpen: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Website Integration</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <CalendarCodetextArea
                            fullWidthCopyButton={true}
                            eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                            userId={this.props.userId}
                            shopifyUser={this.props.shopifyUser}
                            bigcommerceUser={this.props.bigcommerceUser}
                            displayPublicCalendarForm={true}
                        />
                    </div>
                </Modal>
            </span>
        );
    }
});
