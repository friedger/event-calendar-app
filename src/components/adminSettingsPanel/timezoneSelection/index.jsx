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
                        <Row className="settings-space settings-space--bottom-padding-0">
                            <Col md={12}>
                                <ControlLabel className="setting-title no-description">Calendar timezone:</ControlLabel>
                            </Col>
                            <Col md={12}>
                                <select className="form-control" {...timezone}
                                    onChange={(e) => this.inputOnChange(e, timezone, handleSubmit, true)}
                                    onBlur={(e) => this.inputOnChange(e, timezone, handleSubmit, true)}>
                                    {moment.tz.names().map(function (timezone, index) {
                                        return <option key={index}>{timezone}</option>
                                    })}
                                </select>
                            </Col>
                        </Row>
                        <Row className="settings-space">
                            <Col md={12}>
                                <ControlLabel className="setting-title no-description">Time format:</ControlLabel>
                            </Col>
                            <Col md={12}>
                                <select className="form-control" {...timeformat}
                                    onChange={(e) => this.inputOnChange(e, timeformat, handleSubmit, true)}
                                    onBlur={(e) => this.inputOnChange(e, timeformat, handleSubmit, true)}>
                                    <option key={1} value={12}>12hr</option>
                                    <option key={2} value={24}>24hr</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="settings-space">
                            <Col md={12}>

                            <div className="checkbox">
                                <input
                                    id="endTimes"
                                    name="endTimes"
                                    onClick={e =>
                                        this.inputOnChange(e, endTimes, handleSubmit)}
                                    type="checkbox"
                                    {...endTimes}
                                />
                            <label htmlFor="endTimes">
                                    <div className="hideOverflow setting-title">
                                        Display end times
                                    </div>
                                </label>
                            </div>
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
