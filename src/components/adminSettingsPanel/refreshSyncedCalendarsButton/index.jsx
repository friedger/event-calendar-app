require('./style.scss');
import { Row, Col } from 'react-bootstrap';
import React from 'react';
import cn from 'classNames';
export default React.createClass({
    getInitialState() {
        return {
            refreshDone: false
        };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.savingEvent === false && this.props.savingEvent) {
            this.setState({ refreshDone: true });
            setTimeout(() => {
                this.setState({ refreshDone: false });
            }, 2000);
        }
    },
    render() {
        const { savingEvent } = this.props;
        const refreshDone = this.state.refreshDone;
        return (
            <Row className="settings-space">
                <Col md={7}>
                    <span className="setting-title">Refresh synced events</span>
                    <p className="calendar-selection__description">
                        When you add any events to your synced calendars, click
                        this button to refresh your Event Calendar (We do this
                        automatically for you periodically).
                    </p>
                </Col>
                <Col md={5} style={{ textAlign: 'right' }}>
                    <button
                        className={cn('action trigger-widget-refresh-button', {
                            'animate-success': refreshDone
                        })}
                        disabled={savingEvent}
                        onClick={() => !savingEvent && !refreshDone && this.props.refreshEventCalendarAction()}
                    >
                        <i
                            className={cn('fa fa-refresh', {
                                'fa-spin': this.props.savingEvent
                            })}
                            aria-hidden="true"
                        />{' '}
                        {savingEvent && !refreshDone && 'Refreshing...'}
                        {!savingEvent && !refreshDone && ' Refresh events'}
                        {refreshDone && ' Refreshed'}
                    </button>
                </Col>
            </Row>
        );
    }
});
