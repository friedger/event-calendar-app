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
                                    className={cn('full-width', {
                                        'animate-success': this.state.postingWasSuccess,
                                        'secondary': !this.props.validationError,
                                        'danger': this.props.validationError
                                    })}
                                    disabled={this.props.validationError}
                                >
                                    {!this.state.postingWasSuccess && (
                                        <div className={cn({ 'opacity-0': postingEvent })}>
                                            {!this.props.validationError && 'Add event'}
                                            {this.props.validationError && 'Whoops. You\'ve missed some details...'}
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
                            <div className="addEventSubmitButtons__actions addEventSubmitButtons__actions--submit-buttons">
                                <button
                                    onClick={this.props.close}
                                    className="secondary"
                                    style={{ 'align-self': 'center' }}
                                >
                                    Finish adding events
                                </button>
                                <button
                                    title="Further edit the event - images/ticket links etc"
                                    onClick={this.props.editEventClicked}
                                    className="secondary secondary--inverse secondary--icon-only"
                                >
                                    <i className="fas fa-paint-brush"></i>
                                </button>
                                <button
                                    title="Add another event"
                                    onClick={this.props.addNewEventClicked}
                                    className="secondary secondary--inverse secondary--icon-only"
                                >
                                    <i className="fas fa-calendar-plus"></i>
                                </button>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
});
