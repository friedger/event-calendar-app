require('./style.scss');

import React from 'react';
import { Link } from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';

const WidgetButton = React.createClass({
    getInitialState() {
        return {
            modalOpen: false
        };
    },
    deleteWidget() {
        this.props.deleteAction(this.props.widget.uuid);
    },
    getWidgetName(widget, number) {
        if (widget.calendarAlias) {
            return widget.calendarAlias.alias;
        }

        return `Calendar ${number}`;
    },
    render() {
        return (
            <Link to={`/editor/${this.props.widget.uuid}`}>
            <div className="col-md-3">
                <div className="widget-button">
                    <div className="widget-button__text">
                        {this.getWidgetName(this.props.widget, this.props.number)}
                    </div>
                    {this.props.deleteAction && <div className="widget-button__trash">
                        <i onClick={(e) => {
                            e.preventDefault();
                            this.setState({modalOpen: true})
                        }} className="fa fa-trash" aria-hidden="true"></i>
                    </div>}
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

export default WidgetButton;
