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

var Component = React.createClass({
    handleSubmit(values) {
        return postCalendars(values).then(() => {
            this.props.resetForm();
            this.props.calendarAdded();
        }).catch((data) => {
            return Promise.reject({_error: 'Failllleeeeeddddd'});
        });
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
                    <form onSubmit={handleSubmit(this.handleSubmit)} ref='icsForm' className="form-horizontal">
                        <FormGroup>
                            <Row className="add-ics-form">
                                <Col md={4}>
                                    <input className="form-control" {...calendarname} placeholder="Calendar Name (This can be anything)"/>
                                </Col>
                                <Col md={6}>
                                    <input className="form-control" {...calendarurl} placeholder="Calendar ICS Url"/>
                                </Col>
                                <Col md={2}>
                                    <button disabled={submitting} className="action full-width submit-inline" type="submit">
                                        <div className={cn({'opacity-0': submitting})}>Add</div>
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
    fields: ['calendarname', 'calendarurl']
})(Component);
