require('./style.scss');

import React from 'react';
import { Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { postLogin } from '../../../actions/apiActions';
import { Row, Col } from 'react-bootstrap';
import cn from 'classnames';
import Loader from 'react-loader';

function noOpPromise() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, 12000);
    });
}

var Login = React.createClass({
    render() {
        const {
            fields: { username, password },
            error,
            handleSubmit,
            submitting
        } = this.props;
        return (
            <Row className="loginForm">
                <Col md={12}>
                    <form
                        onSubmit={handleSubmit(values => {
                            return postLogin(values).then(
                                () => {
                                    // Currently need to make user request /dashboard from the server
                                    window.location.href = '/dashboard';
                                    // Hack to keep spinner spinning while browser loads new page
                                    return noOpPromise();
                                },
                                () => {
                                    return Promise.reject({
                                        _error:
                                            'Login Failed. Wrong username or password'
                                    });
                                }
                            );
                        })}
                    >
                        <FormGroup>
                            <ControlLabel>Username or Email</ControlLabel>
                            <FormControl
                                type="text"
                                label="Username or Email"
                                placeholder="Enter text"
                                {...username}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="Enter password"
                                label="Password"
                                {...password}
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            value="Login"
                            className="action-button"
                            disabled={submitting}
                        >
                            <div className={cn({ 'opacity-0': submitting })}>
                                LOG IN
                            </div>
                            {submitting && (
                                <div className="large-loader">
                                    <Loader
                                        type="spin"
                                        color="#000"
                                        width={3}
                                        radius={7}
                                    />
                                </div>
                            )}
                        </Button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </Col>
            </Row>
        );
    }
});

export default (Login = reduxForm({
    // <----- THIS IS THE IMPORTANT PART!
    form: 'contact', // a unique name for this form
    fields: ['username', 'password'] // all the fields in your form
})(Login));
