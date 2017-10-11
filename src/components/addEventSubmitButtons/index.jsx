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
            }, 2000);
        }
    },
    render() {
        const { postedEvent, postingEvent } = this.props;
        return (
            <div>
                {!this.state.displaySubmitButtons &&
                <Row className="settings-space">
                    <Col md={12}>
                        <button
                            onClick={this.props.addEventClicked}
                            className={cn('secondary full-width', { 'animate-success': this.state.postingWasSuccess })}
                        >
                            {!this.state.postingWasSuccess && <div className={cn({ 'opacity-0': postingEvent })}>Add event</div>}
                            {postingEvent && (
                                <div className="large-loader">
                                    <Loader type="spin" color="#000" width={2} radius={5} />
                                </div>
                            )}
                            {this.state.postingWasSuccess && <div><i className="fa fa-check" aria-hidden="true" /> Event Added</div>}
                        </button>
                    </Col>
                </Row>
                }
                {this.state.displaySubmitButtons && (
                    <Row className="settings-space addEventSubmitButtons">
                        <Col md={12}>
                            <button onClick={this.props.editEventClicked} className="secondary">
                                ✏️ Edit this Event
                            </button>
                            <button onClick={this.props.addNewEventClicked} className="secondary">
                                📆 Add another event
                            </button>
                            <button onClick={this.props.close} className="secondary">
                                Close event editor
                            </button>
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
});
