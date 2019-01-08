if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col, Checkbox, FormGroup, ControlLabel} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import Loader from 'react-loader';
import cn from 'classnames';
import triggerWidgetRefresh from '../../../utils/triggerWidgetRefresh';

var CalendarSelection = React.createClass({
    formChange(id, event) {
        this.props.onChange(id, event.target.checked);
    },
    render() {
        const { fields, handleSubmit, submitting } = this.props;
        return (
            <div className={cn('calendar-selection-container', { show: this.props.show })}>
                {this.props.loading ?
                    <div className="calendar-selection__loading"><Loader type='spin' color='#000' width={2} radius={3} /></div>
                :
                <div>
                <Row className="settings-space">
                    <div className="col-md-12">
                        <span className="setting-title">Manually add events</span>
                        <p className="calendar-selection__description">All manually added events are grouped by the Event Calendar you added them to. Which manual events would you like to display?</p>
                    </div>
                    <Col md={12}>
                        <form>
                            <FormGroup>
                                <Row className="calendar-selection">
                                    {Object.keys(fields).map((calendar, index) => {
                                        if (this.props.calendars[calendar].calendar_type !== 'manual') {
                                            return;
                                        }
                                        const field = fields[calendar];
                                        return (
                                            <Col md={12} key={index}>
                                                <div className="checkbox">
                                                    <input id={index + '-checkbox'} type="checkbox" onClick={this.formChange.bind(null, this.props.calendars[calendar].calendar_id)} {...field}/>
                                                    <label htmlFor={index + '-checkbox'}>
                                                        <div className="hideOverflow">{this.props.calendars[calendar].calendar_name ? ('Events from ' + this.props.calendars[calendar].calendar_name) : 'Manually created events'}</div>
                                                    </label>
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </FormGroup>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <hr></hr>
                    </Col>
                </Row>
                <Row className="settings-space settings-space--bottom-padding-0">
                    <div className="col-md-12">
                        <span className="setting-title">Synced Calendars</span>
                        <span onClick={this.props.toggleConnectionsScreen} style={{float: 'right', 'padding-bottom': 0, 'padding-top': '2px'}} className="button secondary secondary--inverse">Sync more</span>
                        <p className="calendar-selection__description">External calendars we are currently synced to. Select those you would like to appear in your Events Calendar.</p>
                    </div>
                    <Col md={12}>
                    <form>
                        <FormGroup>
                            <Row className="calendar-selection">
                        {Object.keys(fields).map((calendar, index) => {
                            if (this.props.calendars[calendar].calendar_type === 'manual') {
                                return;
                            }
                            const field = fields[calendar];
                            return (
                                <Col md={12} key={index}>
                                    <div className="checkbox">
                                        <input id={index + '-checkbox'} onChange={() => console.log('change fired')} type="checkbox" onClick={this.formChange.bind(null, this.props.calendars[calendar].calendar_id)} {...field}/>
                                        <label htmlFor={index + '-checkbox'}>
                                            <div className="hideOverflow">{this.props.calendars[calendar].calendar_name}</div>
                                        </label>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    {this.props.children}
                    </FormGroup>
                    </form>
                </Col>
                </Row>

                </div>

            }
        </div>
        )
    }
});

export default CalendarSelection = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'calendarSelection',
  destroyOnUnmount: false                       // a unique name for this form
})(CalendarSelection);

import React from 'react';

// <p>1) Choose which of your calendars to display</p>
