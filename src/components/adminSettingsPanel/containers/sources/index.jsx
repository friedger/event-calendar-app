import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as calendarActions from '../../../../actions/calendarActions';

import { withRouter } from 'react-router-dom';

import CalendarSelection from '../../calendarSelection';
import RefreshSyncedCalendarsButton from '../../refreshSyncedCalendarsButton';
import triggerWidgetRefresh from '../../../../utils/triggerWidgetRefresh';
import SidePanelWrapper from '../../sidePanelWrapper';
import SidePanelContainer from '../../sidePanelContainer';
import CategoryHeader from '../../categoryHeader';
import Hint from '../../hint';
import { parse } from 'query-string';

const mapState = state => {
    return {
        calendars: state.appState.calendars,
        calendarsLoading: state.appState.calendarsLoading,
        eventSaving: state.eventSavingState.eventSaving
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...calendarActions
        },
        dispatch
    );
};

const component = React.createClass({
    getCalendarFormInitialValues(calendars) {
        return Object.keys(calendars).reduce((collection, current) => {
            // this is breaking - why?
            collection[current] = calendars[current].selected;
            return collection;
        }, {});
    },
    refreshEventCalendar(e) {
        this.props.manuallyTriggeredRefresh();
        triggerWidgetRefresh({ breakCache: true });
    },
    render() {
        const { putCalendars, calendarsLoading, calendars } = this.props;
        const eventCalWidgetUuid = this.props.match.params.eventCalWidgetUuid;
        const query = parse(location.search);

        return (
            <SidePanelContainer>
                <CategoryHeader eventCalWidgetUuid={eventCalWidgetUuid} title={'Event Sources'} />
                <SidePanelWrapper>
                    {query.cronofySuccess && <Hint type='secondary'>
                        <p><strong>Hey there! We've linked to your calendars successfully!</strong></p><p>It's likely the first thing you need to do is choose which of your calendars you want us to sync to. You can do this below.</p>
                    </Hint>}
                    <CalendarSelection
                        onChange={putCalendars.bind(null, eventCalWidgetUuid)}
                        toggleConnectionsScreen={() => this.props.history.push('/connections')}
                        initialValues={this.getCalendarFormInitialValues(calendars)}
                        loading={calendarsLoading}
                        addEventClicked={this.props.addEventClicked}
                        fields={Object.keys(calendars)}
                        calendars={calendars}
                        show={true}
                    >
                        <RefreshSyncedCalendarsButton
                            savingEvent={this.props.savingEvent}
                            refreshEventCalendarAction={this.refreshEventCalendar}
                        />
                    </CalendarSelection>
                </SidePanelWrapper>
            </SidePanelContainer>
        );
    }
});

export default withRouter(
    connect(
        mapState,
        mapDispatch
    )(component)
);
