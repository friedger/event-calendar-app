import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Radio } from 'react-bootstrap';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import { Modal } from 'react-bootstrap';

var Component = React.createClass({
    getInitialState() {
        return {
            showModal: false
        };
    },
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => this.props.putSettingsAction(values))();
        });
    },
    render() {
        const { fields: { subscriptionButton }, handleSubmit, validWithPlan } = this.props;
        return (
            <Row
                onClick={() => {
                    if (!validWithPlan) {
                        this.setState({ showModal: true });
                    }
                }}
                className={cn('settings-form', { 'settings-form--invalid': !validWithPlan })}
            >
                <Modal
                    show={this.state.showModal}
                    onHide={() => {
                        this.setState({ showModal: false });
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Enable users to subscribe to your calendar</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            Unfortunately this feature is not available on your current plan.
                            Upgrade to enable it.
                        </div>
                    </div>
                </Modal>
                <Col md={12}>
                    <form ref="settingsForm" className="form-horizontal">
                        <FormGroup>
                            <Row className="settings-space">
                                <Col md={8}>
                                    <ControlLabel
                                        className={cn('setting-title', {
                                            'setting-title--strike': !validWithPlan
                                        })}
                                    >
                                        Display subscription button:
                                    </ControlLabel>
                                </Col>
                                {validWithPlan &&
                                    <Col md={4}>
                                        <Radio
                                            inline
                                            name="subscriptionButton"
                                            {...subscriptionButton}
                                            onChange={e =>
                                                this.inputOnChange(
                                                    e,
                                                    subscriptionButton,
                                                    handleSubmit
                                                )}
                                            checked={
                                                subscriptionButton.value === true ||
                                                subscriptionButton.value === 'true'
                                            }
                                            value={true}
                                        >
                                            Yes
                                        </Radio>
                                        <Radio
                                            inline
                                            name="subscriptionButton"
                                            {...subscriptionButton}
                                            onChange={e =>
                                                this.inputOnChange(
                                                    e,
                                                    subscriptionButton,
                                                    handleSubmit
                                                )}
                                            checked={
                                                subscriptionButton.value === false ||
                                                subscriptionButton.value === 'false'
                                            }
                                            value={false}
                                        >
                                            No
                                        </Radio>
                                    </Col>}
                                <Col md={4}>
                                    <div className="settings-form__locked">
                                        {!validWithPlan &&
                                            <i className="fa fa-lock" aria-hidden="true" />}
                                    </div>
                                </Col>
                            </Row>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'subscriptionButtonSelection', // a unique name for this form
        fields: ['subscriptionButton'],
        overwriteOnInitialValuesChange: false
    },
    state => {
        const initialState = Object.assign({}, state.appState, {
            subscriptionButton: state.appState.subscriptionButton.value
        });
        return { initialValues: initialState };
    }
)(Component));
