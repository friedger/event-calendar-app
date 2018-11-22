require('./style.scss');

import React from 'react';
import cn from 'classnames';
import addEventcalScript from '../../../utils/addEventcalScript';

import { Row, Col } from 'react-bootstrap';

export default React.createClass({
    componentDidMount() {
        addEventcalScript(this.props.userId);
        if (window.eventCalendarAppUtilities) {
            window.eventCalendarAppUtilities.init(
                this.props.eventCalWidgetUuid
            );
        }
    },
    render() {
        return (
            <div>
                <p>{this.props.headerText}</p>
                <div
                    data-widgetuuid={this.props.eventCalWidgetUuid}
                    className={cn(
                        { show: this.props.show },
                        'eca-app-container'
                    )}
                />
            </div>
        );
    },
    componentWillUnmount() {
        if (window.eventCalendarAppUtilities) {
            window.eventCalendarAppUtilities.destroy(
                this.props.eventCalWidgetUuid
            );
        }
        this.props.eventcalRemovedAction();
    }
});
