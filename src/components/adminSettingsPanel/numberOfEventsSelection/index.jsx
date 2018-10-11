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
            handleSubmit
        } = this.props;
        return (
            <Row className="settings-form">
                <Col md={12}>
                <form ref='settingsForm' className="form-horizontal">
                    <FormGroup>
                        <Row className="settings-space settings-space--bottom-padding-0">
                            <Col md={12}>
                                <ControlLabel className="setting-title">How many events to display at once</ControlLabel>
                                <p className="calendar-selection__description"><strong>Applies to List and Tile view only</strong></p>
                            </Col>
                            <Col md={12}>
                                <FormControl type="number" min="1" placeholder="5" {...numEventsToDisplay} onChange={(e) => this.inputOnChange(e, numEventsToDisplay, handleSubmit)}/>
                            </Col>
                        </Row>
                        <Row className="settings-space">

                            <Col md={12}>
                                <div className="checkbox">
                                    <input
                                        id="pastEvents"
                                        name="pastEvents"
                                        onClick={e =>
                                            this.inputOnChange(e, pastEvents, handleSubmit)}
                                        type="checkbox"
                                        {...pastEvents}
                                    />
                                    <label htmlFor="pastEvents">
                                        <div className="hideOverflow setting-title">
                                            Display events from the past
                                        </div>
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        {(pastEvents.value === true || pastEvents.value === 'true') && <Row className="settings-space">
                            <Col md={10}>
                                <div className="checkbox">
                                    <input
                                        id="focusOnToday"
                                        name="focusOnToday"
                                        onClick={e =>
                                            this.inputOnChange(e, focusOnToday, handleSubmit)}
                                        type="checkbox"
                                        {...focusOnToday}
                                    />
                                    <label htmlFor="focusOnToday">
                                        <div className="hideOverflow setting-title">
                                            Display todays date first
                                        </div>
                                    </label>

                                </div>
                                <p className="checkbox-description calendar-selection__description"><strong>Applies to List and Tile view only.</strong> Displays future events first, while still allowing access to past events</p>
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
