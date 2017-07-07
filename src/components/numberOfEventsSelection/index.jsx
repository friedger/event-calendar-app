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

var Component = React.createClass({
    componentWillMount() {
        console.log("COMPONNNNENNNTTT MOUNTED")
        this.makeApiCall = debounce(values => this.props.putSettingsAction(values), 500);
    },
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(values))();
        });
    },
    render() {
        const {
            fields: {
                numEventsToDisplay,
                pastEvents
            },
            handleSubmit,
            submitting
        } = this.props;
        return (
            <Row className="settings-form">
                <Col md={12}>
                <form ref='settingsForm' className="form-horizontal">
                    <FormGroup>
                        <Row className="settings-space">
                            <Col md={8}>
                                <ControlLabel className="setting-title">How many events to display at once:</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <FormControl type="number" placeholder="5" {...numEventsToDisplay} onChange={(e) => this.inputOnChange(e, numEventsToDisplay, handleSubmit)} onBlur={(e) => this.inputOnChange(e, numEventsToDisplay, handleSubmit)}/>
                            </Col>
                        </Row>
                        <Row className="settings-space">
                            <Col md={8}>
                                <ControlLabel className="setting-title">Display events in the past:</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <Radio inline name="pastEvents" {...pastEvents} onChange={(e) => this.inputOnChange(e, pastEvents, handleSubmit)} checked={pastEvents.value === true || pastEvents.value === 'true'} value={true}>Yes</Radio>
                                <Radio inline name="pastEvents" {...pastEvents} onChange={(e) => this.inputOnChange(e, pastEvents, handleSubmit)} checked={pastEvents.value === false || pastEvents.value === 'false'} value={false}>No</Radio>
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
    form: 'settingsForm', // a unique name for this form
    fields: ['numEventsToDisplay', 'pastEvents'],
    overwriteOnInitialValuesChange: false
}, state => ({initialValues: state.appState}))(Component);
