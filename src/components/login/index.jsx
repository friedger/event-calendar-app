if (typeof window !== 'undefined') {
    require('./style.scss');
    var cookieUtil = require('../../utils/cookieUtil').default;
}

import React from 'react';
import store from '../../store/index.js';
import {Input, Button} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import {postLogin} from '../../actions/apiActions';
import {Row, Col} from 'react-bootstrap';

import request from 'superagent';

var Component = React.createClass({
    render() {
        const {fields: {username, password}, error, handleSubmit, history} = this.props;
        return (
            <Row className="loginForm">
                <Col md={12}>
                    <h1>Login</h1>
                </Col>
                <Col md={12}>
                    <form onSubmit={handleSubmit((values, dispatch) => {
                            return postLogin(values).then((data) => {
                                //Currently need to make user request /dashboard from the server
                                window.location.href = '/dashboard';
                                dispatch(values);
                            }, (err) => {
                                return Promise.reject({_error: 'Login Failed. Wrong username or password'});
                            });
                        })}>
                        <Input type="text" label="Username or Email" placeholder="Enter text" {...username}/>
                        <Input type="password" label="Password" {...password}/>
                        <Button type="submit" value="Login" className='action-button'>LOG IN</Button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </Col>
            </Row>
        );
    }
})

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(Component);
