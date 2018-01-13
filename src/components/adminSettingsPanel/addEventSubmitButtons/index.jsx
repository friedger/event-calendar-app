require('./style.scss');

import React from 'react';
import cn from 'classnames';
import Loader from 'react-loader';
import { Row, Col } from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            displaySubmitButtons: false,
            postingWasSuccess: false
        };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.postedEvent && this.props.postingEvent && !this.props.postedEvent) {
            this.setState({ postingWasSuccess: true });
            setTimeout(() => {
                this.setState({ displaySubmitButtons: true });
                this.props.onButtonTypeSwitch();
            }, 2000);
        }

        if (
            this.props.postedEvent &&
            nextProps.postedEvent === false &&
            nextProps.postingEvent === false
        ) {
            this.setState({ postingWasSuccess: false, displaySubmitButtons: false });
        }
    },
    render() {
        const { postedEvent, postingEvent } = this.props;
        return (
            <div>
                {!this.state.displaySubmitButtons && (
                    <Row className="addEventSubmitButtons">
                        <Col md={12}>
                            <div className="addEventSubmitButtons__actions">
                                <p className="addEventSubmitButtons__note">
                                    Note: You can add additional settings, once the event has been
                                    added.
                                </p>
                                <button
                                    onClick={this.props.addEventClicked}
                                    className={cn('secondary full-width', {
                                        'animate-success': this.state.postingWasSuccess
                                    })}
                                >
                                    {!this.state.postingWasSuccess && (
                                        <div className={cn({ 'opacity-0': postingEvent })}>
                                            Add event
                                        </div>
                                    )}
                                    {postingEvent && (
                                        <div className="large-loader">
                                            <Loader type="spin" color="#000" width={2} radius={5} />
                                        </div>
                                    )}
                                    {this.state.postingWasSuccess && (
                                        <div>
                                            <i className="fa fa-check" aria-hidden="true" /> Event
                                            Added
                                        </div>
                                    )}
                                </button>
                            </div>
                        </Col>
                    </Row>
                )}
                {this.state.displaySubmitButtons && (
                    <Row className="addEventSubmitButtons">
                        <Col md={12}>
                            <div className="addEventSubmitButtons__actions">
                                <button
                                    onClick={this.props.editEventClicked}
                                    className="secondary secondary"
                                >
                                    ✏️ Further customise event
                                </button>
                                <button
                                    onClick={this.props.addNewEventClicked}
                                    className="secondary secondary"
                                >
                                    + Add new event
                                </button>
                                <button
                                    onClick={this.props.close}
                                    className="secondary secondary--inverse"
                                >
                                    Finish adding events
                                </button>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
});
