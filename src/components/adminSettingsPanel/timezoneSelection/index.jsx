import React from 'react';
import {
    Row,
    Col,
    Input,
    Button,
    HelpBlock,
    FormGroup,
    ControlLabel,
    FormControl,
    Radio,
    Form
} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import debounce from 'lodash.debounce';
import moment from 'moment-timezone';

var Component = React.createClass({
    componentWillMount() {
        this.makeApiCall = debounce((values, breakCache) => this.props.putSettingsAction(values, breakCache), 500);
    },
    inputOnChange(e, field, handleSubmit, breakCache) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(values, breakCache))();
        });
    },
    render() {
        const {
            fields: {
                timezone,
                timeformat,
                endTimes
            },
            handleSubmit,
            submitting
        } = this.props;
        return (
            <Row className="settings-form">
                <Col md={12}>
                <form ref='settingsForm' className="form-horizontal">
                    <FormGroup>
                        <Row className="settings-space settings-space--center settings-space--bottom-padding-0">
                            <Col md={8}>
                                <ControlLabel className="setting-title">Calendar timezone:</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <select {...timezone}
                                    onChange={(e) => this.inputOnChange(e, timezone, handleSubmit, true)}
                                    onBlur={(e) => this.inputOnChange(e, timezone, handleSubmit, true)}>
                                    {moment.tz.names().map(function (timezone, index) {
                                        return <option key={index}>{timezone}</option>
                                    })}
                                </select>
                            </Col>
                        </Row>
                        <Row className="settings-space">
                            <Col md={8}>
                                <ControlLabel className="setting-title">Time format:</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <Radio inline name="timeformat" {...timeformat} onChange={(e) => this.inputOnChange(e, timeformat, handleSubmit)} checked={timeformat.value === 12 || timeformat.value === '12'} value={12}>12hr</Radio>
                                <Radio inline name="timeformat" {...timeformat} onChange={(e) => this.inputOnChange(e, timeformat, handleSubmit)} checked={timeformat.value === 24 || timeformat.value === '24'} value={24}>24hr</Radio>
                            </Col>
                        </Row>
                        <Row className="settings-space">
                            <Col md={8}>
                                <ControlLabel className="setting-title">Display end times:</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <Radio inline name="timeformat" {...endTimes} onChange={(e) => this.inputOnChange(e, endTimes, handleSubmit)} checked={endTimes.value === true || endTimes.value === 'true'} value={true}>Yes</Radio>
                                <Radio inline name="timeformat" {...endTimes} onChange={(e) => this.inputOnChange(e, endTimes, handleSubmit)} checked={endTimes.value === false || endTimes.value === 'false'} value={false}>No</Radio>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <hr></hr>
                            </Col>
                        </Row>
                    </FormGroup>
                </form>
            </Col>
            </Row>
        )
    }
});

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'timezoneSelection', // a unique name for this form
    fields: ['timezone', 'timeformat', 'endTimes'],
    destroyOnUnmount: false,
    overwriteOnInitialValuesChange: false
}, state => ({initialValues: state.appState}))(Component);
