import React from 'react';
import {Row, Col, Input, Button, HelpBlock, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import debounce from 'lodash.debounce';

var Component = React.createClass({
    inputOnChange(e) {
        e.persist();
        this.props.fields.numEventsToDisplay.onChange(e.target.value);
        debounce(this.makeChange(e), 500)();
    },
    makeChange(e) {
        return () => {
            if (e.target.value) {
                this.props.putSettingsAction(e.target.value);
            }
        }
    },
    render() {
        const { fields: {numEventsToDisplay}, handleSubmit, submitting } = this.props;
        return (
            <Row className="settings-form">
                <Col md={4}>
                    <form>
                        <FormGroup>
                            <FormControl
                               type="number"
                               placeholder="5"
                               {...numEventsToDisplay}
                               onChange={this.inputOnChange}
                               onBlur={this.makeChange}
                             />
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        )
    }
});

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'settingsForm',                           // a unique name for this form
  fields: ['numEventsToDisplay']
},
state => ({initialValues: state.appState}))(Component);
