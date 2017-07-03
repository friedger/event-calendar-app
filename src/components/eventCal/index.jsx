if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col} from 'react-bootstrap';
import addEventcalScript from '../../utils/addEventcalScript';
import cn from 'classnames';

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
                    <div id="app-container" className={cn('show', {'adjusted': this.props.suggestionsActive})}></div>
                </Col>
            </Row>
        )
    },
    componentWillUnmount() {
        this.props.eventcalRemovedAction();
    }
});

export default Component;

import React from 'react';
