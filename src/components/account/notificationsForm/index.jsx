import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import debounce from 'lodash.debounce';

var Component = React.createClass({
    componentWillMount() {
        this.makeApiCall = debounce(values => this.props.putNotificationsAction(values), 500);
    },
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(values))();
        });
    },
    render() {
        const { fields: { newSubscription }, handleSubmit, submitting } = this.props;
        return (
            <Row className="settings-form">
                <Col md={12}>
                    <form ref="settingsForm" className="form-horizontal">
                        <FormGroup>
                            <Row className="settings-space">
                                <Col md={8}>
                                    <ControlLabel className="setting-title">
                                        New subscription:
                                    </ControlLabel>
                                </Col>
                                <Col md={4}>
                                    <Radio
                                        inline
                                        name="newSubscription"
                                        {...newSubscription}
                                        onChange={e =>
                                            this.inputOnChange(e, newSubscription, handleSubmit)}
                                        checked={
                                            newSubscription.value === true || newSubscription.value === 'true'
                                        }
                                        value={true}
                                    >
                                        Yes
                                    </Radio>
                                    <Radio
                                        inline
                                        name="pastEvents"
                                        {...newSubscription}
                                        onChange={e =>
                                            this.inputOnChange(e, newSubscription, handleSubmit)}
                                        checked={
                                            newSubscription.value === false ||
                                            newSubscription.value === 'false'
                                        }
                                        value={false}
                                    >
                                        No
                                    </Radio>
                                </Col>
                            </Row>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'notificationsForm', // a unique name for this form
        fields: ['newSubscription'],
        overwriteOnInitialValuesChange: false,
        destroyOnUnmount: false
    },
    state => ({ initialValues: state.notificationState })
)(Component));
