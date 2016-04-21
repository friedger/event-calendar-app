if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col} from 'react-bootstrap';
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
                    {Object.keys(fields).map((calendar, index) => {
                        const field = fields[calendar];
                        return (
                            <Col md={3} key={index}>
                                <Input onClick={this.formChange.bind(null, this.props.calendars[calendar].id)} type="checkbox" label={this.props.calendars[calendar].name} {...field}/>
                            </Col>
                        )
                    })}
                </form>
            </Col>
            </Row>
        )
    }
});

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'calendarSelection',                           // a unique name for this form
})(Component);

import React from 'react';

// <p>1) Choose which of your calendars to display</p>
