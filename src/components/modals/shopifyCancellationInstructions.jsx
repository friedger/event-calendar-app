import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Cancel account - Shopify</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <p>Really sorry to see you go. 😔</p>
                    <p>To cancel your account with us, simply delete the Event Calendar App from your Shopify account.</p>
                </div>
            </Modal>
        );
    }
});
