if (typeof window !== 'undefined') {
    require('./style.scss');
}

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
import moment from 'moment-timezone';
import Loader from 'react-loader';
import cn from 'classnames';

import {postCalendars} from '../../actions/apiActions';

const validate = values => {
    const errors = {};
    if (!values.calendarname) {
        errors.calendarname = 'A calendar name is required';
    }

    if (!values.calendarurl) {
        errors.calendarurl = 'A calendar url is required';
    }

    return errors;
}

var Component = React.createClass({
    handleSubmit(values) {
        if (this.props.selectIcsFeedAutomatically) {
            values.selected = true;
        }

        return postCalendars(values, window.eventCalWidgetUuid).then(() => {
            this.props.resetForm();
            this.props.calendarAdded();
        }).catch((data) => {
            return Promise.reject({_error: 'Failllleeeeeddddd'});
        });
    },
    _getValidationState(field) {
        if (field.touched && field.error) {
            return 'error';
        }
    },
    render() {
        const {
            fields: {
                calendarname,
                calendarurl
            },
            handleSubmit,
            submitting,
            error
        } = this.props;
        return (
            <Row className="ics-form">
                <Col md={12}>
                    <form onSubmit={handleSubmit(this.handleSubmit)} ref='icsForm'>
                        <FormGroup validationState={this._getValidationState(calendarname)}>
                            <Row className="add-ics-form">
                                <Col md={12}>
                                    <FormGroup>
                                        <ControlLabel>Calendar Name</ControlLabel>
                                        <FormControl
                                           type="text"
                                           placeholder="Give your calendar a name (Your users wont see this)"
                                           {...calendarname}
                                         />
                                         {calendarname.touched && calendarname.error && <HelpBlock>{calendarname.error}</HelpBlock>}
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup validationState={this._getValidationState(calendarurl)}>
                                        <ControlLabel>Calendar ICS URL</ControlLabel>
                                        <FormControl
                                           type="text"
                                           placeholder="The ICS url to your calendar"
                                           {...calendarurl}
                                         />
                                         {calendarurl.touched && calendarurl.error && <HelpBlock>{calendarurl.error}</HelpBlock>}
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <button disabled={submitting} className="action-button btn btn-default" type="submit">
                                        <div className={cn({'opacity-0': submitting})}>Connect calendar</div>
                                        {submitting && <Loader type='spin' color='#fff' width={2} radius={3} />}
                                    </button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    {error && <span className="validation-message">This calendar feed could not be added. Please contact us for help or try another calendar.</span>}
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
    form: 'addIcsCalendar', // a unique name for this form
    fields: ['calendarname', 'calendarurl'],
    validate
})(Component);
