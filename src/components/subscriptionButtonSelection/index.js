import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Radio } from 'react-bootstrap';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import LockedFeature from '../lockedFeature';

var Component = React.createClass({
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
                                {!validWithPlan && <LockedFeature columns={4} title={'Enable users to subscribe to your calendar'}/>}
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
