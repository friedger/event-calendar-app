import React from 'react';
import { Modal } from 'react-bootstrap';
import AddIcsCalendarForm from '../addIcsCalendarForm';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Add an ICS calendar</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <div className="connection-modal__content">
                        <AddIcsCalendarForm
                            calendarAdded={() => {
                                this.props.hide();
                                this.props.icsAddedAction();
                            }}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
});
