require('./style.scss');

import React from 'react';
const Link = require('react-router').Link;
import {Button, Modal} from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            modalOpen: false
        };
    },
    deleteWidget() {
        this.props.deleteAction(this.props.widget.uuid);
    },
    render() {
        return (
            <Link to={`/editor/${this.props.widget.uuid}`}>
            <div className="col-md-3">
                <div className="widget-button">
                    <div className="widget-button__text">
                        Calendar {this.props.number}
                    </div>
                    <div className="widget-button__trash">
                        <i onClick={(e) => {
                            e.preventDefault();
                            this.setState({modalOpen: true})
                        }} className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                </div>
                <Modal show={this.state.modalOpen} onHide={() => this.setState({modalOpen: false})} className="widget-button-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Delete Events Calendar</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal widget-button-modal">
                        <div className="connection-modal__content">
                            <p>Are you sure you want to delete this Events Calendar?</p>
                            <button onClick={() => this.props.deleteAction(this.props.widget.uuid) && this.setState({modalOpen: false})} className="danger">
                                <i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
                        </div>
                    </div>
                </Modal>
            </div>
            </Link>
        )
    }
});