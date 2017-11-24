require('./style.scss');
import React from 'react';
import {
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';

var Component = React.createClass({
    render() {
        const { fields: { name }, handleSubmit } = this.props;
        return (
            <form ref="addFilterForm" className="form-horizontal addFilterForm" onSubmit={handleSubmit}>
                <FormGroup>
                    <Row className="settings-space settings-space--center settings-space--bottom-padding-0">
                        <Col md={12}>
                            <span className="setting-title">
                                <strong>Add a new filter</strong>
                            </span>
                            <FormControl
                                type="text"
                                placeholder="Filter name"
                                {...name}
                                />
                            <button className="action">Add filter</button>
                        </Col>

                    </Row>
                </FormGroup>
            </form>
        );
    }
});
export default Component = reduxForm({
    form: 'createFilterForm',
    fields: ['name']
})(Component);
