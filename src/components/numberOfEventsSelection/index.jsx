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
                <form ref='settingsForm'>
                    <FormGroup>
                        <Row>
                        <Col md={6}>
                            <ControlLabel>How many events to display at once</ControlLabel>
                            <FormControl type="number" placeholder="5" {...numEventsToDisplay} onChange={(e) => this.inputOnChange(e, numEventsToDisplay, handleSubmit)} onBlur={(e) => this.inputOnChange(e, numEventsToDisplay, handleSubmit)}/>
                        </Col>
                        <Col md={6}>
                            <ControlLabel>Display events in the past</ControlLabel>
                            <div>
                            <Radio inline name="pastEvents" {...pastEvents} onChange={(e) => this.inputOnChange(e, pastEvents, handleSubmit)} checked={pastEvents.value === true || pastEvents.value === 'true'} value={true}>Yes</Radio>
                            <Radio inline name="pastEvents" {...pastEvents} onChange={(e) => this.inputOnChange(e, pastEvents, handleSubmit)} checked={pastEvents.value === false || pastEvents.value === 'false'} value={false}>No</Radio>
                            </div>
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
    fields: ['numEventsToDisplay', 'pastEvents']
}, state => ({initialValues: state.appState}))(Component);
