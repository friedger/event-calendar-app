require('./style.scss');

import React from 'react';
import cn from 'classnames';
import Loader from 'react-loader';
import { Row, Col } from 'react-bootstrap';

export default React.createClass({
    render() {
        const { postedEvent, postingEvent } = this.props;
        return (
            <div>
            {!postedEvent && <Row className="settings-space">
                    <Col md={12}>
                        <button onClick={this.props.addEventClicked} className="secondary full-width">
                            <div className={cn({ 'opacity-0': postingEvent })}>Add event</div>
                            {postingEvent && <div className='large-loader'><Loader type='spin' color='#000' width={2} radius={5} /></div>}
                        </button>
                    </Col>
                </Row>}
                {postedEvent && <Row className="settings-space addEventSubmitButtons">
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
                </Row>}
            </div>
        );
    }
});
