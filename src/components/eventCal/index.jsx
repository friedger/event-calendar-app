if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col} from 'react-bootstrap';
import addEventcalScript from '../../utils/addEventcalScript';

var calendarHasBeenRendered = false;

var Component = React.createClass({
    componentDidMount() {
        if (!calendarHasBeenRendered) {
            addEventcalScript(this.props.userId);
            calendarHasBeenRendered = true;
        }
    },
    render() {
        return (
            <div>
                <div id="app-container" className={this.props.activeCalendars > 0 ? 'show': 'hide'}></div>
            </div>
        )
    }
});

export default Component;

import React from 'react';
