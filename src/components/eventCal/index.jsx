if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col} from 'react-bootstrap';
import addEventcalScript from '../../utils/addEventcalScript';

var calendarHasBeenRendered = false;

var Component = React.createClass({
    componentDidMount() {
        if (!document.getElementById('event-calendar-app')) {
            addEventcalScript(this.props.userId);
            calendarHasBeenRendered = true;
        }
    },
    render() {
        return (
            <Row>
                <Col md={12}>
                    <p>{this.props.headerText}</p>
                    <div id="app-container" className={this.props.activeCalendars > 0 ? 'show': 'hide'}></div>
                </Col>
            </Row>
        )
    }
});

export default Component;

import React from 'react';

// <p>Your calendar will look like this:</p>
