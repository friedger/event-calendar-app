if (typeof window !== 'undefined') {
    require('./styles.scss');
}

import React from 'react';
import {Modal, Button} from 'react-bootstrap';
const cookieUtil = require('../../../utils/cookieUtil').default;

export default React.createClass({
    getInitialState() {
        return {showModal: true};
    },
    show() {
        cookieUtil.setItem('seen-successful-link-modal', true, Infinity);
    },
    close() {
        this.setState({showModal: false});
    },
    render() {
        return (
            <Modal onShow={this.show} className="successful-link-modal" onHide={this.close} show={this.state.showModal}>
                <Modal.Body>
                    <h3>You've successfully linked your first calendar!</h3>
                    <p>Congratulations, we've got hold of your calendar and now you're ready to go.</p>
                    <hr/>

                    <h3>What should I do first?</h3>
                    <p>Event Calendar App is unbelievably simple and we hope that the dashboard is as self explanatory as possible.</p>
                    <p>The dashboard enables you to configure exactly how you would like your event calendar to look. As soon as you've done that, there's a small code snippet to make the calendar appear on your site.</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button btn btn-default" onClick={this.close}>Let's get started</button>
                </Modal.Footer>
            </Modal>
        )
    }
});
