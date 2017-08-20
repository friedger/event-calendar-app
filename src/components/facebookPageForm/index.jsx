require('./style.scss');

import React from 'react';
import { Row, Col, HelpBlock, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import Loader from 'react-loader';
import cn from 'classnames';

import { postFacebookCalendarUrl } from '../../actions/facebookActions';

const validate = values => {
    const errors = {};

    if (!values.pageUrl) {
        errors.pageUrl = 'A url is required';
    }

    return errors;
};

var Component = React.createClass({
    handleSubmit(values) {
        if (this.props.selectIcsFeedAutomatically) {
            values.selected = true;
        }

        return postFacebookCalendarUrl(values, window.eventCalWidgetUuid)
            .then(() => {
                this.props.resetForm();
                this.props.pageSelectionSuccess();
            })
            .catch(() => {
                return Promise.reject({ error: 'Failllleeeeeddddd' });
            });
    },
    getValidationState(field) {
        if (field.touched && field.error) {
            return 'error';
        }
    },
    render() {
        const {
            fields: { pageUrl },
            handleSubmit,
            submitting,
            error
        } = this.props;
        return (
            <Row className="ics-form">
                <Col md={12}>
                    <form onSubmit={handleSubmit(this.handleSubmit)} ref="icsForm">
                        <FormGroup validationState={this.getValidationState(pageUrl)}>
                            <Row className="add-ics-form">
                                <Col md={12}>
                                    <FormGroup
                                        validationState={this.getValidationState(pageUrl)}
                                    >
                                        <ControlLabel>Facebook page URL</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="The URL of your Facebook page"
                                            {...pageUrl}
                                        />
                                    {pageUrl.touched &&
                                            pageUrl.error &&
                                            <HelpBlock>
                                                {pageUrl.error}
                                            </HelpBlock>}
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <button
                                        disabled={submitting}
                                        className="action-button btn btn-default"
                                        type="submit"
                                    >
                                        <div className={cn({ 'opacity-0': submitting })}>
                                            Sync
                                        </div>
                                        {submitting &&
                                            <Loader
                                                type="spin"
                                                color="#fff"
                                                width={2}
                                                radius={3}
                                            />}
                                    </button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    {error &&
                                        <span className="validation-message">
                                            We could not find the events feed for this page. Please try another.
                                        </span>}
                                </Col>
                            </Row>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default (Component = reduxForm({
    // <----- THIS IS THE IMPORTANT PART!
    form: 'facebookPage', // a unique name for this form
    fields: ['pageUrl'],
    validate
})(Component));
