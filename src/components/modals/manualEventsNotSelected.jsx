import React from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const ManualEventsNotSelected = React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>You don't have manual events turned on 🤔</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <div className="connection-modal__content">
                        <p>
                            You can still create events, however if you don't turn manually created events on then you
                            won't see them in your Events Calendar.
                        </p>
                        <p>
                            We recommend turning on the manual events for this Event Calendar before creating new
                            events. <strong>You can do this on the Event Sources panel.</strong>
                        </p>
                    </div>
                    <div className="connection-modal__help-image">
                        <img src="/images/help/turnOnManualEvents.gif" />
                    </div>
                    <div className="connection-modal__buttons">
                        <button
                            onClick={() => {
                                this.props.history.push(`${this.props.location.pathname}/sources`);
                                this.props.hide();
                            }}
                            className="action"
                        >
                            Event Sources
                        </button>
                        <button onClick={this.props.continueAnyway} className="default default--inverse">
                            Continue anyway
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
});

export default withRouter(ManualEventsNotSelected);
