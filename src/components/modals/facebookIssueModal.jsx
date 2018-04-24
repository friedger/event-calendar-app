import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Syncing with Facebook is temporarily unavailable</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <p>
                        Due to the privacy issues (that you may have seen in the press) related to Facebook, they have currently blocked access for third parties (us) to access your facebook events.
                    </p>

                    <p>I believe this is temporary, but have decided to turn this functionality off until everything is working as normal.</p>

                    <p>I have done a full write up about this issue <a className="normal" href="https://support.eventcalendarapp.com/faqs-and-troubleshooting/my-facebook-events-stopped-working">here.</a></p>

                    <p>Please accept my largest apologies.</p>
                    <p>Thank you.</p>
                </div>
            </Modal>
        );
    }
});
