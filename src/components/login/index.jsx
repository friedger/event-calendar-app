if (typeof window !== 'undefined') {
    require('./style.scss');
    var cookieUtil = require('../../utils/cookieUtil').default;
}

import React from 'react';
import store from '../../store/index.js';
import {Input, ButtonInput} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import request from 'superagent';

const submitToApi = (formState) => {
    return new Promise((resolve, reject) => {
        request
        .post('http://localhost:3000/login')
        .send({username: formState.username, password: formState.password})
        .end((err, res) => {
            if (err) {
                return reject();
            }

            cookieUtil.setItem('eventcal-admin', res.body.token, 2333000); //Expires in roughly 27 days
            resolve()
        });
    });

}

var Component = React.createClass({
    render() {
        const {fields: {username, password}, error, handleSubmit, history} = this.props;
        return (
            <div className="loginForm">
                <form onSubmit={handleSubmit((values, dispatch) => {
                        return submitToApi(values).then(() => {
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
