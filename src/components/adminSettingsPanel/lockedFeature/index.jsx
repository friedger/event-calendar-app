import React from 'react';
import { Col } from 'react-bootstrap';
import UpgradeModal from '../../modals/upgradeModal';

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
                <UpgradeModal
                    show={this.state.showModal}
                    title={title}
                    hide={() => {
                        this.setState({ showModal: false });
                    }}
                />
                <div
                    className="settings-form__locked"
                    onClick={() => this.setState({ showModal: true })}
                >
                    <i className="fa fa-lock" aria-hidden="true" />
                </div>
            </Col>
        );
    }
});
