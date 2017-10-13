import React from 'react';
import { Modal } from 'react-bootstrap';
import AddIcsCalendarForm from '../addIcsCalendarForm';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>You added your first event 🤘</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <div className="connection-modal__content">
                        <p><strong>Great news!</strong></p>

                        <p>To edit events, after you have created them, simply click on them directly in your Event Calendar preview.</p>
                    </div>
                </div>
            </Modal>
        );
    }
});
