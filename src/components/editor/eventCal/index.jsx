require('./style.scss');

import React from 'react';
import cn from 'classnames';
import addEventcalScript from '../../../utils/addEventcalScript';

import { Row, Col } from 'react-bootstrap';

export default React.createClass({
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
                    <div
                        data-widgetuuid={this.props.eventCalWidgetUuid}
                        className={cn(
                            { show: this.props.show },
                            { adjusted: this.props.suggestionsActive },
                            'eca-app-container'
                        )}
                    />
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
