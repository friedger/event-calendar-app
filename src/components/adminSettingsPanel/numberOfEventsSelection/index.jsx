import React from 'react';
import {
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    Radio
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import debounce from 'lodash.debounce';

var Component = React.createClass({
    componentWillMount() {
        this.makeApiCall = debounce(values => this.props.putSettingsAction(values, true), 500);
    },
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        if ((field.name === 'numEventsToDisplay') && (e.target.value === '')) {
            // Don't want to trigger an update when the current value is removed because they are about to type another value
            return;
        }
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(values))();
        });
    },
    render() {
        const {
            fields: {
                numEventsToDisplay,
                pastEvents,
                focusOnToday
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
                                <ControlLabel className="setting-title">How many events to display at once:</ControlLabel>
                                <p className="calendar-selection__description"><strong>Applies to List and Tile view only</strong></p>
                            </Col>
                            <Col md={4}>
                                <FormControl type="number" min="1" placeholder="5" {...numEventsToDisplay} onChange={(e) => this.inputOnChange(e, numEventsToDisplay, handleSubmit)}/>
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
                        {(pastEvents.value === true || pastEvents.value === 'true') && <Row className="settings-space">
                            <Col md={8}>
                                <ControlLabel className="setting-title">Display todays date first:</ControlLabel>
                                <p className="calendar-selection__description"><strong>Applies to List and Tile view only.</strong> Displays future events first, while still allowing access to past events</p>
                            </Col>
                            <Col md={4}>
                                <Radio inline name="pastEvents" {...focusOnToday} onChange={(e) => this.inputOnChange(e, focusOnToday, handleSubmit)} checked={focusOnToday.value === true || focusOnToday.value === 'true'} value={true}>Yes</Radio>
                                <Radio inline name="pastEvents" {...focusOnToday} onChange={(e) => this.inputOnChange(e, focusOnToday, handleSubmit)} checked={focusOnToday.value === false || focusOnToday.value === 'false'} value={false}>No</Radio>
                            </Col>
                        </Row>}
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
    form: 'settingsForm', // a unique name for this form
    fields: ['numEventsToDisplay', 'pastEvents', 'focusOnToday'],
    overwriteOnInitialValuesChange: false,
    destroyOnUnmount: false
}, state => ({initialValues: state.appState}))(Component);
