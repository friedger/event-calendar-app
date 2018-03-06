require('./style.scss');
// require('./editor.scss');
import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Radio, HelpBlock } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import Editor from 'react-rte/lib/RichTextEditor';

const validate = values => {
    const errors = {};
    if (!values.eventName) {
        errors.eventName = 'An event name is required';
    }
    if (!values.eventDescription) {
        errors.eventDescription = 'An event description is required';
    }

    return errors;
};

var Component = React.createClass({
    getInitialState() {
        console.log(this.props, 'the props');
        return {
            value: this.props.fields.eventDescription.value
                ? Editor.createValueFromString(this.props.fields.eventDescription.value, 'html')
                : Editor.createEmptyValue()
        };
    },
    onEditorStateChange(editorState) {
        console.log(editorState.toString('html'));
    },
    componentWillMount() {
        this.makeApiCall = debounce(values => {
            this.props.putEventAction(values);
        }, 1000);
    },
    componentDidMount() {
        // this.setState({
        //     value: this.props.input.value
        //         ? Editor.createValueFromString(this.props.eventDescription.value, 'markdown')
        //         : Editor.createEmptyValue()
        // });
    },
    inputChanged() {
        if (this.props.putToApiOnChange) {
            setTimeout(() => {
                this.props.handleSubmit(values => this.makeApiCall(Object.assign(values, { usesHTMLEditor: true })))();
            }, 0);
        }
    },
    handleChange(value) {
        this.setState({ value });
        let markdown = value.toString('html');
        if (
            markdown.length === 2 &&
            markdown.charCodeAt(0) === 8203 &&
            markdown.charCodeAt(1) === 10
        ) {
            markdown = '';
        }
        this.inputChanged();
        const shortDescription = value.getEditorState().getCurrentContent().getPlainText();
        this.props.fields.shortDescription.onChange(shortDescription);
        this.props.fields.eventDescription.onChange(markdown);
    },
    render() {
        const {
            fields: { eventName, eventDescription, eventLocation, start, end, repeat, allDay }
        } = this.props;

        return (
            <form>
                <FormGroup className={cn('new-post-form', { show: this.props.show })}>
                    {this.props.displayAdditionalOptionsMessage && (
                        <Row>
                            <Col md={12}>
                                {!this.props.disableInputs && (
                                    <p className="sub-text">
                                        Note - once you've added the event, you will then have the
                                        option to add additional options such as images, thumbnails
                                        and much more.
                                    </p>
                                )}
                                {this.props.disableInputs && (
                                    <p className="sub-text">
                                        Click <strong>further customise event</strong> to add
                                        additional information to your event, such as images,
                                        tickets and more...
                                    </p>
                                )}
                            </Col>
                        </Row>
                    )}
                    {this.props.displayAdditionalOptionsMessage && (
                        <Row>
                            <Col md={12}>
                                <hr />
                            </Col>
                        </Row>
                    )}
                    <Row className="settings-space">
                        <Col md={12}>
                            <ControlLabel className={'setting-title'}>🖍 Event Name:</ControlLabel>
                            <p>What is the name of your event?</p>
                        </Col>
                        <Col md={12}>
                            <FormControl
                                disabled={this.props.disableInputs}
                                {...eventName}
                                className={cn({ error: eventName.touched && eventName.error })}
                                onChange={e => {
                                    eventName.onChange(e);
                                    setTimeout(() => this.inputChanged(), 0);
                                }}
                                type="text"
                                placeholder="Name of your event"
                            />
                            {eventName.touched &&
                                eventName.error && <HelpBlock>{eventName.error}</HelpBlock>}
                        </Col>
                    </Row>
                    <Row className="settings-space">
                        <Col md={12}>
                            <ControlLabel className={'setting-title'}>
                                📕 Event description:
                            </ControlLabel>
                            <p>Some more information about your event</p>
                        </Col>
                        <Col md={12}>
                            <Editor value={this.state.value} onChange={this.handleChange} />

                            {eventDescription.touched &&
                                eventDescription.error && (
                                    <HelpBlock>{eventDescription.error}</HelpBlock>
                                )}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <hr />
                        </Col>
                    </Row>
                    <Row className="settings-space">
                        <Col md={12}>
                            <ControlLabel className={'setting-title'}>🌎 Location:</ControlLabel>
                            <p>Where is your event taking place?</p>
                        </Col>
                        <Col md={12}>
                            <FormControl
                                {...eventLocation}
                                disabled={this.props.disableInputs}
                                onChange={e => {
                                    eventLocation.onChange(e);
                                    setTimeout(() => this.inputChanged(), 0);
                                }}
                                type="text"
                                placeholder="Event location"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <hr />
                        </Col>
                    </Row>
                    <Row className="settings-space">
                        <Col md={12}>
                            <ControlLabel className={'setting-title'}>🕐 Start:</ControlLabel>
                            <p>What time does your event start?</p>
                        </Col>
                        <Col md={12}>
                            <Datetime
                                utc={true}
                                inputProps={{
                                    disabled: this.props.disableInputs
                                }}
                                value={moment(start.value)}
                                onChange={date => {
                                    start.onChange(date.valueOf());
                                    setTimeout(() => this.inputChanged(), 0);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="settings-space">
                        <Col md={12}>
                            <ControlLabel className={'setting-title'}>🕣 End:</ControlLabel>
                            <p>What time does your event end?</p>
                        </Col>
                        <Col md={12}>
                            <Datetime
                                inputProps={{
                                    disabled: this.props.disableInputs
                                }}
                                utc={true}
                                value={moment(end.value)}
                                onChange={date => {
                                    end.onChange(date.valueOf());
                                    setTimeout(() => this.inputChanged(), 0);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <hr />
                        </Col>
                    </Row>
                    <Row className="settings-space">
                        <Col md={12}>
                            <ControlLabel className={'setting-title'}>🙌 Repeat:</ControlLabel>
                        </Col>
                        <Col md={12}>
                            <select
                                {...repeat}
                                disabled={this.props.disableInputs}
                                onChange={repeatValue => {
                                    repeat.onChange(repeatValue);
                                    setTimeout(() => this.inputChanged(), 0);
                                }}
                            >
                                <option>Never</option>
                                <option>Every Day</option>
                                <option>Every Week</option>
                                <option>Every Month</option>
                                <option>Every Year</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className="settings-space">
                        <Col md={8}>
                            <ControlLabel className="setting-title">⛰ All day:</ControlLabel>
                        </Col>
                        <Col md={4}>
                            <Radio
                                inline
                                name="allDayEvent"
                                value="true"
                                checked={allDay.value === true || allDay.value === 'true'}
                                onChange={event => {
                                    allDay.onChange(event);
                                    setTimeout(() => this.inputChanged(), 0);
                                }}
                                disabled={this.props.disableInputs}
                            >
                                Yes
                            </Radio>
                            <Radio
                                inline
                                name="allDayEvent"
                                value="false"
                                checked={allDay.value === false || allDay.value === 'false'}
                                onChange={event => {
                                    allDay.onChange(event);
                                    setTimeout(() => this.inputChanged(), 0);
                                }}
                                disabled={this.props.disableInputs}
                            >
                                No
                            </Radio>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <hr />
                        </Col>
                    </Row>
                    {this.props.displayAdditionalOptionsMessage && (
                        <Row>
                            <Col md={12}>
                                {!this.props.disableInputs && (
                                    <p className="sub-text">
                                        Note - once you've added the event, you will then have the
                                        option to add additional options such as images, thumbnails
                                        and much more.
                                    </p>
                                )}
                                {this.props.disableInputs && (
                                    <p className="sub-text">
                                        Click <strong>further customise event</strong> to add
                                        additional information to your event, such as images,
                                        tickets and more...
                                    </p>
                                )}
                            </Col>
                        </Row>
                    )}
                </FormGroup>
            </form>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'manualEventsForm', // a unique name for this form
        fields: [
            'eventName',
            'eventDescription',
            'eventLocation',
            'start',
            'end',
            'repeat',
            'allDay',
            'shortDescription'
        ],
        validate
    },
    state => {
        if (!state.eventState.start) {
            state.eventState.start = moment
                .utc()
                .hour(9)
                .minute(0)
                .valueOf();
        }
        if (!state.eventState.end) {
            state.eventState.end = moment
                .utc()
                .hour(10)
                .minute(0)
                .valueOf();
        }
        if (!state.eventState.allDay) {
            state.eventState.allDay = false;
        }
        return { initialValues: state.eventState };
    }
)(Component));
