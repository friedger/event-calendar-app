import React from 'react';
import { Col, Modal } from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            showModal: false
        };
    },
    render() {
        const { columns, title } = this.props;
        return (
            <Col md={columns}>
                <Modal
                    show={this.state.showModal}
                    onHide={() => {
                        this.setState({ showModal: false });
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                {title}
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            Unfortunately this feature is not available on your current plan.
                            Upgrade to enable it.
                        </div>
                    </div>
                </Modal>
                <div className="settings-form__locked" onClick={() => this.setState({ showModal: true })}>
                    <i className="fa fa-lock" aria-hidden="true" />
                </div>
            </Col>
        );
    }
});
