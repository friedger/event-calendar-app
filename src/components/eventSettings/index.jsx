require('./style.scss');
import React from 'react';
import cn from 'classnames';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import debounce from 'lodash.debounce';
import uploadcare from 'uploadcare-widget';

var timer;

var ignoreImageOnChange = false;
var ignoreThumbnailOnChange = false;

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
        this.makeApiCall = debounce(values => {
            this.props.putEventAction(values);
        }, 100);
    },
    componentDidMount() {
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

        this.setState({ widget, widget2 });
    },
    deleteImage() {
        this.props.putEventAction({ image: null });
        this.props.fields.image.onChange(false);
        this.state.widget.value(false);
    },
    deleteThumbnail() {
        this.props.putEventAction({ thumbnail: null });
        this.props.fields.thumbnail.onChange(false);
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
            fields: { ticketsLink, purchaseText, image, thumbnail },
            handleSubmit
        } = this.props;
        return (
            <div className={cn('event-settings', { show: this.state.showComponent })}>
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
                                            onChange={e =>
                                                this.inputOnChange(e, ticketsLink, handleSubmit)}
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
                                            onBlur={e =>
                                                this.inputOnBlur(e, purchaseText, handleSubmit)}
                                            onChange={e =>
                                                this.inputOnChange(e, purchaseText, handleSubmit)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel className="setting-title">
                                            🌄 Image Url:
                                        </ControlLabel>
                                        <p>
                                            The image to be displayed for your event.
                                        </p>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                        <input
                                            {...image}
                                            type="hidden"
                                            id={'somediv'}
                                            data-crop="4:1"
                                            data-image-shrink="1080x270 75%"
                                        />
                                        </div>
                                    {image.value && <button onClick={this.deleteImage} className="danger">Delete</button>}
                                    </Col>
                                </Row>
                                <Row className="settings-space">
                                    <Col md={6}>
                                        <ControlLabel className="setting-title">
                                            🌄 Thumbnail Url:
                                        </ControlLabel>
                                        <p>The image to display as the thumbnail.</p>
                                    </Col>
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
                                    {thumbnail.value && <button onClick={this.deleteThumbnail} className="danger">Delete</button>}
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
