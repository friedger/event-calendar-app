import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Radio, FormControl } from 'react-bootstrap';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import LockedFeature from '../lockedFeature';
import OptionToggle from '../optionToggleField';

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
                                <OptionToggle
                                    field={subscriptionButton}
                                    title={'Display subscription button'}
                                    validWithPlan={validWithPlan}
                                    lockedMessage={'Enable users to subscribe to your calendar'}
                                    >

                                </OptionToggle>

                            </Row>
                            <Row className="settings-space">
                                <Col md={12}>
                                    <ControlLabel
                                        className={cn('setting-title', {
                                            'setting-title--strike': !validWithPlan
                                        })}
                                    >
                                        Calendar Name for subscribers
                                    </ControlLabel>
                                    <p className="calendar-selection__description">People will see this inside of their calendar application when they subscribe to your event calendar. <strong>It will take 30min for this change to take effect.</strong></p>
                                </Col>
                                <Col md={12}>
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
