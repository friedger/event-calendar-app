if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col, Checkbox, FormGroup, ControlLabel} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

var Component = React.createClass({
    formChange(id, event) {
        this.props.onChange(id, event.target.checked)
    },

    render() {
        const { fields, handleSubmit, submitting } = this.props;
        return (
            <Row>
                <Col md={12}>
                <form>
                    <FormGroup>
                        <Row>
                    {Object.keys(fields).map((calendar, index) => {
                        const field = fields[calendar];
                        return (
                            <Col md={4} key={index}>
                                <Checkbox className='abc-checkbox abc-checkbox-primary' onClick={this.formChange.bind(null, this.props.calendars[calendar].id)} {...field}>
                                    <div className="hideOverflow">{this.props.calendars[calendar].name}</div>
                                </Checkbox>
                            </Col>
                        )
                    })}
                </Row>
                </FormGroup>
                </form>
            </Col>
            </Row>
        )
    }
});

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'calendarSelection'                         // a unique name for this form
})(Component);

import React from 'react';

// <p>1) Choose which of your calendars to display</p>
