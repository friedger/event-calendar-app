import React from 'react';
import {
    Row,
    Col,
    FormGroup
} from 'react-bootstrap';
import cn from 'classnames';
import { reduxForm } from 'redux-form';
import OptionToggle from '../optionToggleField';

var Component = React.createClass({
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => this.props.putSettingsAction(values))();
        });
    },
    render() {
        const {
            fields: { maps },
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
                                            maps,
                                            handleSubmit
                                        )}
                                    lockedMessage={
                                        'Enable users to subscribe to your calendar'
                                    }
                                    field={maps}
                                    title={'Display Google Maps'}
                                    description={
                                        'Displays a map embedded inside of your event'
                                    }
                                />
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
        form: 'mapsSelection', // a unique name for this form
        fields: ['maps'],
        destroyOnUnmount: false,
        overwriteOnInitialValuesChange: false
    },
    state => {
        return { initialValues: state.appState };
    }
)(Component));
