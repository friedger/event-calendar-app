import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.hide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>You are about to disconnect from Cronofy</span>
                    </Modal.Title>
                </Modal.Header>
                <div className="col-md-12 connection-modal">
                    <div className="connection-modal__cronofy">
                        <img src="https://3o7nze1htecu8vh6nuko0m13-wpengine.netdna-ssl.com/wp-content/themes/cronofy-2015/images/cronofy_logo-wide-colour.svg" />
                    </div>
                    <div className="connection-modal__content">
                        <p>
                            We use a third party service called <strong>Cronofy</strong> to
                            connect Event Calendar App to your Google, Apple, or Outlook
                            calendar.
                        </p>
                        <p>
                            Clicking confirm will disconnect your Event Calendar App account
                            from Cronofy, enabling you to re-connect another account if you
                            wish.
                        </p>
                    </div>
                    <a
                        target="_blank"
                        onClick={this.props.onDisconnct}
                        className="danger full-width"
                    >
                        Disconnect
                    </a>
                </div>
            </Modal>
        );
    }
});
