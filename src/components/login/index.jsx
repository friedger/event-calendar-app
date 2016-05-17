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
import cn from 'classnames';
import Loader from 'react-loader';
import request from 'superagent';

var Component = React.createClass({
    render() {
        const {fields: {username, password}, error, handleSubmit, history, submitting} = this.props;
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
                        <Button type="submit" value="Login" className='action-button'>
                            <div className={cn({'opacity-0': submitting})}>LOG IN</div>
                            {submitting && <div className='large-loader'><Loader type='spin' color='#000' width={3} radius={7} /></div>}
                        </Button>
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
