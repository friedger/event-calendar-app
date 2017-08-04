require('./style.scss');
import React from 'react';
import cn from 'classnames';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import debounce from 'lodash.debounce';

var timer;

var Component = React.createClass({
    getInitialState() {
        return {};
    },
    refreshCalendar(e, handleSubmit) {
        e.preventDefault();
        handleSubmit(values => this.makeApiCall(values))();
    },
    finishEditing(e) {
        e.preventDefault();
        this.props.exitAction();
    },
    componentWillMount() {
        this.makeApiCall = debounce(values => this.props.putEventAction(values), 100);
    },
    inputOnBlur(e, field) {
        field.onChange(e);
    },
    inputOnChange(e, field) {
        field.onChange(e);
    },
    componentWillReceiveProps(nextProps) {
        clearTimeout(timer);
        if (nextProps.show) {
            timer = setTimeout(() => {
                this.setState({ showComponent: true });
            }, 500);
            return;
        }
        return this.setState({ showComponent: false });
    },
    render() {
        const {
            fields: {
                ticketsLink,
                purchaseText,
                image,
                thumbnail
            },
            handleSubmit
        } = this.props;
        return (
            <div
                className={cn('event-settings', { show: this.state.showComponent })}
            >
                <div className="row settings-form">
                    <div className="col-md-12">
                        <form ref="settingsForm" className="form-horizontal">
                            <FormGroup>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel className="setting-title">
                                            🎟 Tickets Link:
                                        </ControlLabel>
                                        <p>Where can people buy tickets to your event?</p>
                                    </Col>
                                    <Col md={6}>
                                        <FormControl
                                            {...ticketsLink}
                                            type="text"
                                            placeholder="Link to buy tickets"
                                            onChange={(e) => this.inputOnChange(e, ticketsLink, handleSubmit)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel className="setting-title">
                                            🎫 Tickets Text:
                                        </ControlLabel>
                                        <p>What text would you like to display in the button?</p>
                                    </Col>
                                    <Col md={6}>
                                        <FormControl
                                            {...purchaseText}
                                            type="text"
                                            placeholder="Tickets button text"
                                            onBlur={(e) => this.inputOnBlur(e, purchaseText, handleSubmit)}
                                            onChange={(e) => this.inputOnChange(e, purchaseText, handleSubmit)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel className="setting-title">
                                            🌄 Image Url:
                                        </ControlLabel>
                                        <p>The link to the image to display when an event is clicked.</p>
                                    </Col>
                                    <Col md={6}>
                                        <FormControl
                                            {...image}
                                            type="text"
                                            placeholder="The URL to the image to display"
                                            onChange={(e) => this.inputOnChange(e, image, handleSubmit)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel className="setting-title">
                                            🌄 Thumbnail Url:
                                        </ControlLabel>
                                        <p>The link to the image to display in the thumbnail.</p>
                                    </Col>
                                    <Col md={6}>
                                        <FormControl
                                            {...thumbnail}
                                            type="text"
                                            placeholder="The URL to the thumbnail to display"
                                            onChange={(e) => this.inputOnChange(e, image, handleSubmit)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={12}>
                                        <button onClick={(e) => this.refreshCalendar(e, handleSubmit)} className="secondary full-width">Save</button>
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={12}>
                                        <button onClick={(e) => this.finishEditing(e)} className="action full-width">Finish editing event</button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'settingsForm', // a unique name for this form
        fields: ['ticketsLink', 'purchaseText', 'image', 'thumbnail'],
        overwriteOnInitialValuesChange: true
    },
    state => ({ initialValues: state.eventState })
)(Component));
