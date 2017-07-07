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

var Component = React.createClass({
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => this.props.putSettingsAction(values))();
        });
    },
    render() {
        const {
            fields: {
                subscriptionButton
            },
            handleSubmit,
            submitting
        } = this.props;
        return (
            <Row className="settings-form">
                <Col md={12}>
                <form ref='settingsForm' className="form-horizontal">
                    <FormGroup>
                        <Row className="settings-space">
                            <Col md={8}>
                                <ControlLabel className="setting-title">Display subscription button:</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <Radio inline name="subscriptionButton" {...subscriptionButton} onChange={(e) => this.inputOnChange(e, subscriptionButton, handleSubmit)} checked={subscriptionButton.value === true || subscriptionButton.value === 'true'} value={true}>Yes</Radio>
                                <Radio inline name="subscriptionButton" {...subscriptionButton} onChange={(e) => this.inputOnChange(e, subscriptionButton, handleSubmit)} checked={subscriptionButton.value === false || subscriptionButton.value === 'false'} value={false}>No</Radio>
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
    form: 'subscriptionButtonSelection', // a unique name for this form
    fields: ['subscriptionButton'],
    overwriteOnInitialValuesChange: false
}, state => ({initialValues: state.appState}))(Component);
