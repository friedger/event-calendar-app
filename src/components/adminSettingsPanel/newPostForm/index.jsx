require('./style.scss');
// require('./editor.scss');
import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Radio, HelpBlock } from 'react-bootstrap';
import Datetime from 'react-datetime';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import config from '../../../../config';

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
        return {
            editor: false
        };
    },
    onEditorStateChange(editorState) {
        console.log(editorState.toString('html'));
    },
    componentWillMount() {
        tinyMCE.baseURL = `${config.appUrl}/tinymce`;
        this.makeApiCall = debounce(values => {
            this.props.putEventAction(values);
        }, 1000);
    },
    inputChanged() {
        if (this.props.putToApiOnChange) {
            setTimeout(() => {
                this.props.handleSubmit(values => this.makeApiCall(values))();
            }, 0);
        }
    },
    handleChange() {
        this.props.fields.shortDescription.onChange(this.state.editor.getContent({ format: 'text' }));
        this.props.fields.eventDescription.onChange(this.state.editor.getContent());
        this.inputChanged();
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
                            <Editor
                                initialValue={this.props.fields.eventDescription.value
                                    ? this.props.fields.eventDescription.value.split('\n').map((item, i) => {
                                        return '<p>' + item + '</p>';
                                    }).join('')
                                    : ''}
                                init={{
                                    formats: {
                                        alignleft: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
                                        aligncenter: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
                                        alignright: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
                                        alignjustify: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
                                        underline: {inline : 'span', 'classes' : 'underline', exact : true}
                                    },
                                    plugins: 'link code',
                                    menubar: false,
                                    inline_styles : false,
                                    toolbar: 'undo redo | formatselect | bold italic | link | alignleft aligncenter alignright | code |',
                                    height: '250px',
                                    setup: editor => {
                                        this.setState({ editor });
                                        editor.on('keyup change', () => {
                                            this.handleChange();
                                        });
                                    }
                                }}
                            />
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
                            <ControlLabel className={'setting-title'}>🔁 Repeat:</ControlLabel>
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
                            <ControlLabel className="setting-title">🌅 All day:</ControlLabel>
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
