if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col, Checkbox, FormGroup, ControlLabel} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import Loader from 'react-loader';

var Component = React.createClass({
    formChange(id, event) {
        this.props.onChange(id, event.target.checked)
    },

    render() {
        const { fields, handleSubmit, submitting } = this.props;
        return (
            <div>
                {this.props.loading ?
                    <div className="calendar-selection__loading"><Loader type='spin' color='#000' width={2} radius={3} /></div>
                :
                <Row>
                    <Col md={12}>
                    <form>
                        <FormGroup>
                            <Row className="calendar-selection">
                        {Object.keys(fields).map((calendar, index) => {
                            const field = fields[calendar];
                            return (
                                <Col md={4} key={index}>
                                    <div className="checkbox">
                                        <input id={index + '-checkbox'} type="checkbox" onClick={this.formChange.bind(null, this.props.calendars[calendar].calendar_id)} {...field}/>
                                        <label htmlFor={index + '-checkbox'}>
                                            <div className="hideOverflow">{this.props.calendars[calendar].calendar_name}</div>
                                        </label>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    </FormGroup>
                    </form>
                </Col>
                </Row>
            }
        </div>
        )
    }
});

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'calendarSelection'                         // a unique name for this form
})(Component);

import React from 'react';

// <p>1) Choose which of your calendars to display</p>
