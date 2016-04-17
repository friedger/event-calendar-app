if (typeof window !== 'undefined') {
    require('./style.scss');
    var cookieUtil = require('../../utils/cookieUtil').default;
}

import React from 'react';
import store from '../../store/index.js';
import {Input, ButtonInput} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import request from 'superagent';
import {postUsers, postLogin} from '../../actions/apiActions';
import {Row, Col} from 'react-bootstrap';

var Component = React.createClass({
    render() {
        const {fields: {username, password, confirmpassword, email}, handleSubmit, error, router} = this.props;
        return (
            <Row className="register-form">
                <Col>
                    <h1>Register</h1>
                </Col>
                <Col>
                    <form onSubmit={handleSubmit((values, dispatch) => {
                            return postUsers(values).then(() => {
                                return postLogin(values);
                            }).then(() => {
                                return router.push('/dashboard');
                            }, (err) => {
                                return Promise.reject(err)
                            });
                        })}>
                        {username.touched && username.error && <div>{username.error}</div>}
                        <Input type="text" label="Username" placeholder="Enter text" {...username}/>
                        {email.touched && email.error && <div>{email.error}</div>}
                        <Input type="text" label="Email" placeholder="Enter text" {...email}/>
                        <Input type="password" label="Password" {...password}/>
                        <Input type="password" label="Confirm Password" {...confirmpassword}/>
                        <ButtonInput type="submit" value="Submit" />
                        {error && <div>{error}</div>}
                    </form>
                </Col>
            </Row>
        );
    }
})

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'register',                           // a unique name for this form
  fields: ['username', 'password', 'confirmpassword', 'email'] // all the fields in your form
})(Component);
