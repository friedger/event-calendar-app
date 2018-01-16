import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>You're all set up🤘</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <div className="connection-modal__content">
                        <p><strong>Great news!</strong></p>
                        <p>If you haven't heard us say it enough already, it really is a pleasure to have you set up and on board with us.</p>
                        <p>Now you've got the Event Calendar set up on your site, feel free to continue to use the editor to make adjustments to your Event Calendar.</p>
                        <p>Remember: <strong>You don't need to copy/paste the embed code every time you make an update. This will all happen automatically.</strong></p>
                        <p>If you need anything at all in the future, please just <a href="#" className="normal" onClick={() => { window.Intercom('show'); }}>get in touch!</a> Always happy to help. 😆</p>
                    </div>
                </div>
            </Modal>
        );
    }
});
