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
        const { fields: { maps }, handleSubmit, validWithPlan } = this.props;
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
                                        Display Google Maps:
                                    </ControlLabel>
                                    <p className="calendar-selection__description">Displays a map embedded inside of your event</p>
                                </Col>
                                {validWithPlan &&
                                    <Col md={4}>
                                        <Radio
                                            inline
                                            name="maps"
                                            {...maps}
                                            onChange={e =>
                                                this.inputOnChange(
                                                    e,
                                                    maps,
                                                    handleSubmit
                                                )}
                                            checked={
                                                maps.value === true ||
                                                maps.value === 'true'
                                            }
                                            value={true}
                                        >
                                            Yes
                                        </Radio>
                                        <Radio
                                            inline
                                            name="maps"
                                            {...maps}
                                            onChange={e =>
                                                this.inputOnChange(
                                                    e,
                                                    maps,
                                                    handleSubmit
                                                )}
                                            checked={
                                                maps.value === false ||
                                                maps.value === 'false'
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
        form: 'mapsSelection', // a unique name for this form
        fields: ['maps'],
        destroyOnUnmount: false,
        overwriteOnInitialValuesChange: false
    },
    state => {
        return { initialValues: state.appState };
    }
)(Component));
