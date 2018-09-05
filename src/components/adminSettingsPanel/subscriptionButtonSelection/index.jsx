import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Radio, FormControl } from 'react-bootstrap';
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
        const { fields: { subscriptionButton, calendarName }, handleSubmit, validWithPlan } = this.props;
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
                            <Row className="settings-space">
                                <Col md={8}>
                                    <ControlLabel
                                        className={cn('setting-title', {
                                            'setting-title--strike': !validWithPlan
                                        })}
                                    >
                                        Calendar Name for subscribers:
                                    </ControlLabel>
                                    <p className="calendar-selection__description">People will see this inside of their calendar application when they subscribe to your event calendar. <strong>It will take 30min for this change to take effect.</strong></p>
                                </Col>
                                <Col md={4}>
                                    <FormControl type="text" placeholder="calendar" {...calendarName} onChange={(e) => this.inputOnChange(e, calendarName, handleSubmit)} />
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
        fields: ['subscriptionButton', 'calendarName'],
        destroyOnUnmount: false,
        overwriteOnInitialValuesChange: false
    },
    state => {
        const initialState = Object.assign({}, state.appState, {
            subscriptionButton: state.appState.subscriptionButton && state.appState.subscriptionButton.value
        });
        return { initialValues: initialState };
    }
)(Component));
