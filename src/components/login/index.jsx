if (typeof window !== 'undefined') {
    require('./style.scss');
    var cookieUtil = require('../../utils/cookieUtil').default;
}

import React from 'react';
import store from '../../store/index.js';
import {Input, ButtonInput} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import {postLogin} from '../../actions/apiActions';

import request from 'superagent';

var Component = React.createClass({
    render() {
        const {fields: {username, password}, error, handleSubmit, history} = this.props;
        return (
            <div className="loginForm">
                <form onSubmit={handleSubmit((values, dispatch) => {
                        return postLogin(values).then(() => {
                            this.props.router.push('/dashboard');
                            dispatch(values);
                        }, (err) => {
                            return Promise.reject({_error: 'Login Failed. Wrong username or password'});
                        });
                    })}>
                    <Input type="text" label="Username" placeholder="Enter text" {...username}/>
                    <Input type="password" label="Password" {...password}/>
                    <ButtonInput type="submit" value="Login" />
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        );
    }
})

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(Component);
