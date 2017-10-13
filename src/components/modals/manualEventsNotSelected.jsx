import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>You don't have manual events selected 🤔</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <div className="connection-modal__content">
                        <p>You can still create events, however if you don't turn manually created events on then you won't see them in your events calendar.</p>
                        <p>We recommend turning on <strong>'Manualy created events'</strong> before creating new events.</p>
                    </div>
                    <div className="connection-modal__help-image">
                        <img src="/images/help/turnOnManualEvents.gif"></img>
                    </div>
                    <div className="connection-modal__buttons">
                        <button onClick={this.props.hide} className="action">Back to settings</button>
                        <button onClick={this.props.continueAnyway} className="default">Continue anyway</button>
                    </div>
                </div>
            </Modal>
        );
    }
});
