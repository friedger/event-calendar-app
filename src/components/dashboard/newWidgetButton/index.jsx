require('./style.scss');

import React from 'react';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            modalOpen: false
        };
    },
    render() {
        return (
            <div
                className="col-md-3"
                onClick={() => {
                    if (this.props.weeblyUser) {
                        return this.setState({ modalOpen: true });
                    }
                    return this.props.onClick();
                }}
            >
                <Modal
                    show={this.state.modalOpen}
                    onHide={() => this.setState({ modalOpen: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Multi-calendar support</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            <p>
                                Unfortunately multi-calendar is not currently supported in Weebly.
                                If you would like to see multi-calendar support in weebly, please
                                let us know by <a className="normal" href="mailto:hello@eventcalendarapp.com">sending us a quick message</a>.
                            </p>
                            <p>Thank you for your understanding.</p>
                        </div>
                    </div>
                </Modal>
                <div className="new-widget">
                    <i className="fa fa-plus" aria-hidden="true" />
                    <div className="new-widget__text">Create a new Events Calendar</div>
                </div>
            </div>
        );
    }
});
