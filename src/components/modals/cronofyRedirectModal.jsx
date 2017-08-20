import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>You're about to be taken to our partner...</span>
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
                            calendar. You will briefly be taken away from our site while you
                            connect.
                        </p>
                        <p>Don't worry, you only have to do this once!</p>
                    </div>
                    {this.props.user && this.props.user.bigcommerceUser
                        ? <a
                              target="_blank"
                              onClick={this.hitCronofy}
                              className="action full-width"
                          >
                              Connect
                          </a>
                        : <a href={this.props.authUrl} className="action full-width">
                              Connect
                          </a>}
                </div>
            </Modal>
        );
    }
});
