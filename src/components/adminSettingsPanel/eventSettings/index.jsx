require('./style.scss');
import React from 'react';
import cn from 'classnames';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import debounce from 'lodash.debounce';
import uploadcare from 'uploadcare-widget';
import LockedFeature from '../lockedFeature';
import { TwitterPicker } from 'react-color';
import NewPostForm from '../newPostForm';
import Filters from '../../../containers/filters';
var timer;

var ignoreImageOnChange = false;
var ignoreThumbnailOnChange = false;

const pickerColours = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39'
];

var Component = React.createClass({
    getInitialState() {
        return { widgetsInit: false };
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
        this.makeApiCall = debounce(values => {
            this.props.putEventAction(values);
        }, 1000);
    },
    componentDidMount() {
        if (this.props.validWithPlan && !this.props.demoEvent) {
            this.initialiseWidgets();
        }
    },
    initialiseWidgets() {
        const widget = uploadcare.Widget('#somediv');
        widget.onChange(file => {
            if (ignoreImageOnChange) {
                ignoreImageOnChange = false;
                return;
            }
            if (file) {
                file.done(info => {
                    this.props.fields.image.onChange(info.cdnUrl);
                    this.props.putEventAction({ image: info.cdnUrl });
                });
            }
        });
        const widget2 = uploadcare.Widget('#thumbnailImageUpload');
        widget2.onChange(file => {
            if (ignoreThumbnailOnChange) {
                ignoreThumbnailOnChange = false;
                return;
            }
            if (file) {
                file.done(info => {
                    this.props.fields.thumbnail.onChange(info.cdnUrl);
                    this.props.putEventAction({ thumbnail: info.cdnUrl });
                });
            }
        });

        this.setState({ widget, widget2, widgetsInit: true });
    },
    deleteImage() {
        this.props.putEventAction({ image: null });
        this.props.fields.image.onChange(null);
        this.state.widget.value(false);
    },
    deleteColor(e) {
        e.preventDefault();
        this.props.putEventAction({ color: null });
        this.props.fields.color.onChange(null);
    },
    deleteThumbnail() {
        this.props.putEventAction({ thumbnail: null });
        this.props.fields.thumbnail.onChange(null);
        this.state.widget2.value(false);
    },
    inputOnBlur(e, field) {
        field.onChange(e);
    },
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        // Settimeout ensures we include the latest value
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(values))();
        }, 0);
    },
    componentDidUpdate() {
        if (this.props.validWithPlan && !this.props.demoEvent && !this.state.widgetsInit) {
            this.initialiseWidgets();
        }
    },
    manualEventSettingsUpdated(handleSubmit, manualEventSettings) {
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(Object.assign(manualEventSettings, values)))();
        }, 0);
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.fields.image.value && this.state.widget) {
            ignoreImageOnChange = true;
            if (nextProps.fields.image.value !== this.props.fields.image.value) {
                this.state.widget.value(nextProps.fields.image.value);
            }
        } else if (this.state.widget) {
            this.state.widget.value(false);
        }
        if (nextProps.fields.thumbnail.value && this.state.widget2) {
            ignoreThumbnailOnChange = true;
            if (nextProps.fields.thumbnail.value !== this.props.fields.thumbnail.value) {
                this.state.widget2.value(nextProps.fields.thumbnail.value);
            }
        } else if (this.state.widget2) {
            this.state.widget2.value(false);
        }

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
            validWithPlan,
            fields: { ticketsLink, purchaseText, image, thumbnail, color },
            handleSubmit
        } = this.props;
        if (this.props.demoEvent) {
            return (
                <div className={cn('event-settings show', { show: this.state.showComponent })}>
                    <div className="demo-event-message">
                        <p>This is an event from our demo calendar and cannot be edited.</p>{' '}
                        <p>Choose one of your own events.</p>
                    </div>
                </div>
            );
        }
        return (
            <div className={cn('event-settings show', { show: this.state.showComponent })}>
                {this.props.manualEventSelected && <button onClick={this.props.deleteManualEvent} className="danger delete-event">Delete event</button>}
                {this.props.manualEventSelected && <NewPostForm
                    ref="newPostForm"
                    inputChange={() => {
                        this.refs.newPostForm.submit();
                    }}
                    onSubmit={values => {
                        this.manualEventSettingsUpdated(handleSubmit, values);
                    }}
                />}
                <div className="row settings-form">
                    <div className="col-md-12">
                        <form ref="settingsForm" className="form-horizontal">
                            <FormGroup>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel
                                            className={cn('setting-title', {
                                                'setting-title--strike': !validWithPlan
                                            })}
                                        >
                                             Manage your filters:
                                         </ControlLabel>
                                         <p>Sort your events into filters</p>
                                    </Col>
                                    <Col md={6}>
                                        <Filters></Filters>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr></hr>
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel
                                            className={cn('setting-title', {
                                                'setting-title--strike': !validWithPlan
                                            })}
                                        >
                                            🖍 Event Color:
                                        </ControlLabel>
                                        <p>Color code your event.</p>
                                    </Col>
                                    {validWithPlan && (
                                        <Col md={6}>
                                            <div className="the-colour-picker">
                                                <TwitterPicker
                                                    color={
                                                        color.value === null ? false : color.value
                                                    }
                                                    onChange={picker =>
                                                        this.inputOnChange(
                                                            picker && picker.hex,
                                                            color,
                                                            handleSubmit
                                                        )}
                                                    triangle={'hide'}
                                                    colors={pickerColours}
                                                    width={260}
                                                />
                                                {color.value && (
                                                    <button
                                                        onClick={this.deleteColor}
                                                        className="danger danger--small delete-color"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </Col>
                                    )}
                                    {!validWithPlan && (
                                        <LockedFeature columns={6} title={'Upgrade your account'} />
                                    )}
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr></hr>
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel
                                            className={cn('setting-title', {
                                                'setting-title--strike': !validWithPlan
                                            })}
                                        >
                                            🎟 Tickets Link:
                                        </ControlLabel>
                                        <p>Where can people buy tickets to your event?</p>
                                    </Col>
                                    {validWithPlan && (
                                        <Col md={6}>
                                            <FormControl
                                                {...ticketsLink}
                                                type="text"
                                                placeholder="Link to buy tickets"
                                                onChange={e =>
                                                    this.inputOnChange(
                                                        e,
                                                        ticketsLink,
                                                        handleSubmit
                                                    )}
                                            />
                                        </Col>
                                    )}
                                    {!validWithPlan && (
                                        <LockedFeature columns={6} title={'Upgrade your account'} />
                                    )}
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel
                                            className={cn('setting-title', {
                                                'setting-title--strike': !validWithPlan
                                            })}
                                        >
                                            {' '}
                                            🎫 Tickets Text:
                                        </ControlLabel>
                                        <p>What text would you like to display in the button?</p>
                                    </Col>
                                    {validWithPlan && (
                                        <Col md={6}>
                                            <FormControl
                                                {...purchaseText}
                                                type="text"
                                                maxLength="11"
                                                placeholder="Tickets button text"
                                                onBlur={e =>
                                                    this.inputOnBlur(e, purchaseText, handleSubmit)}
                                                onChange={e =>
                                                    this.inputOnChange(
                                                        e,
                                                        purchaseText,
                                                        handleSubmit
                                                    )}
                                            />
                                        </Col>
                                    )}
                                    {!validWithPlan && (
                                        <LockedFeature columns={6} title={'Upgrade your account'} />
                                    )}
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr></hr>
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel
                                            className={cn('setting-title', {
                                                'setting-title--strike': !validWithPlan
                                            })}
                                        >
                                            {' '}
                                            🌄 Image Url:
                                        </ControlLabel>
                                        <p>The image to be displayed for your event.</p>
                                    </Col>
                                    {validWithPlan && (
                                        <Col md={6}>
                                            <div>
                                                <input
                                                    {...image}
                                                    type="hidden"
                                                    role="uploadcare-uploader"
                                                    id={'somediv'}
                                                    data-crop="4:1"
                                                    data-image-shrink="1080x270 75%"
                                                />
                                            </div>
                                            {image.value && (
                                                <button
                                                    onClick={this.deleteImage}
                                                    className="danger danger--small"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </Col>
                                    )}
                                    {!validWithPlan && (
                                        <LockedFeature columns={6} title={'Upgrade your account'} />
                                    )}
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel
                                            className={cn('setting-title', {
                                                'setting-title--strike': !validWithPlan
                                            })}
                                        >
                                            {' '}
                                            🌄 Thumbnail Url:
                                        </ControlLabel>
                                        <p>The image to display as the thumbnail.</p>
                                    </Col>
                                    {validWithPlan && (
                                        <Col md={6}>
                                            <div>
                                                <input
                                                    {...thumbnail}
                                                    role="uploadcare-uploader"
                                                    type="hidden"
                                                    id={'thumbnailImageUpload'}
                                                    data-crop="1:1"
                                                    data-image-shrink="125x125 75%"
                                                />
                                            </div>
                                            {thumbnail.value && (
                                                <button
                                                    onClick={this.deleteThumbnail}
                                                    className="danger danger--small"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </Col>
                                    )}
                                    {!validWithPlan && (
                                        <LockedFeature columns={6} title={'Upgrade your account'} />
                                    )}
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <hr></hr>
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={12}>
                                        <button
                                            onClick={e => this.finishEditing(e)}
                                            className="action full-width"
                                        >
                                            Finish editing event
                                        </button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        );
    },
    componentWillUnmount() {
        ignoreImageOnChange = false;
        ignoreThumbnailOnChange = false;
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'eventSettingsForm', // a unique name for this form
        fields: ['ticketsLink', 'purchaseText', 'image', 'thumbnail', 'color'],
        overwriteOnInitialValuesChange: true
    },
    state => ({ initialValues: state.eventState })
)(Component));
