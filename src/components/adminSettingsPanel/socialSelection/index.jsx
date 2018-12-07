import React from 'react';
import {
    Row,
    Col,
    FormGroup
} from 'react-bootstrap';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import OptionToggle from '../optionToggleField';

var Social = React.createClass({
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => this.props.putSettingsAction(values))();
        });
    },
    render() {
        const {
            fields: { social },
            handleSubmit,
            validWithPlan
        } = this.props;
        return (
            <Row
                onClick={() => {
                    if (!validWithPlan) {
                        this.setState({ showModal: true });
                    }
                }}
                className={cn('settings-form', {
                    'settings-form--invalid': !validWithPlan
                })}
            >
                <Col md={12}>
                    <form ref="settingsForm" className="form-horizontal">
                        <FormGroup>
                            <Row className="settings-space">
                                <OptionToggle
                                    validWithPlan={validWithPlan}
                                    inputOnClick={e =>
                                        this.inputOnChange(
                                            e,
                                            social,
                                            handleSubmit
                                        )}
                                    lockedMessage={
                                        'Enable users to subscribe to your calendar'
                                    }
                                    field={social}
                                    title={'Display social buttons'}
                                />
                            </Row>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default (Social = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'socialSelection', // a unique name for this form
        fields: ['social'],
        destroyOnUnmount: false,
        overwriteOnInitialValuesChange: false
    },
    state => {
        return { initialValues: state.appState };
    }
)(Social));
