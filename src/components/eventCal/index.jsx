if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col} from 'react-bootstrap';
import addEventcalScript from '../../utils/addEventcalScript';
import cn from 'classnames';

var Component = React.createClass({
    componentDidMount() {
        addEventcalScript(this.props.userId);
        if (window.eventCalendarAppUtilities) {
            window.eventCalendarAppUtilities.init(this.props.eventCalWidgetUuid);
        }
    },
    render() {
        return (
            <Row>
                <Col md={12}>
                    <p>{this.props.headerText}</p>
                    <div data-widgetuuid={this.props.eventCalWidgetUuid} className={cn({'show': this.props.show}, {'adjusted': this.props.suggestionsActive}, 'eca-app-container')}></div>
                </Col>
            </Row>
        );
    },
    componentWillUnmount() {
        if (window.eventCalendarAppUtilities) {
            window.eventCalendarAppUtilities.destroy(this.props.eventCalWidgetUuid);
        }
        this.props.eventcalRemovedAction();
    }
});

export default Component;

import React from 'react';
