if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import store from '../../store/index.js';
import {Input, ButtonInput} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

var Component = React.createClass({
    render() {
        const {fields: {username, password, confirmpassword, email}, handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={(e) => {e.preventDefault(); this.props.submitAction({username,password,email});} }>
                    <Input type="text" label="Username" placeholder="Enter text" {...username}/>
                    <Input type="text" label="Email" placeholder="Enter text" {...email}/>
                    <Input type="password" label="Password" {...password}/>
                    <Input type="password" label="Confirm Password" {...confirmpassword}/>
                    <ButtonInput type="submit" value="Submit Button" />
                </form>
            </div>
        );
    }
})

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'register',                           // a unique name for this form
  fields: ['username', 'password', 'confirmpassword', 'email'] // all the fields in your form
})(Component);
