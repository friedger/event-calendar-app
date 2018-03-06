import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{this.props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <div className="connection-modal__content">
                        Unfortunately this feature is not available on your current plan. Upgrade to
                        enable it.
                    </div>
                </div>
            </Modal>
        );
    }
});
