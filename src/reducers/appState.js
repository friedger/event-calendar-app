import {
    GET_USER_SUCCESS,
    TOGGLE_SUGESSTIONS,
    EVENTCAL_REMOVED,
    CANVAS_BACKGROUND_MODIFIED
} from '../actions';
import {
    GET_CALENDARS_SUCCESS,
    GET_SETTINGS_SUCCESS,
    GET_CONNECTIONS_SUCCESS,
    GET_CONNECTIONS,
    DELETE_CALENDAR,
    DELETE_CALENDAR_SUCCESS,
    GET_CALENDARS,
    PUT_CALENDARS_SUCCESS
} from '../actions/calendarActions';
import {
    GET_WIDGETS_SUCCESS,
    POST_WIDGETS_ERROR,
    WIDGET_ERROR_ACKNOWLEDGED
} from '../actions/widgetActions';

function orderCalendarsById(a, b) {
    if (a.calendar_id < b.calendar_id) return -1;
    if (a.calendar_id > b.calendar_id) return 1;
    return 0;
}

export default function appState(
    state = {
        calendars: [],
        suggestions: false,
        widgets: [],
        settingsLoaded: false
    },
    action
) {
    switch (action.type) {
    case EVENTCAL_REMOVED:
        return Object.assign({}, state, {
            suggestions: false
        });
    case TOGGLE_SUGESSTIONS:
        return Object.assign({}, state, {
            suggestions: !state.suggestions
        });
    case GET_USER_SUCCESS:
        return Object.assign({}, state, {
            user: action.payload.body
        });
    case GET_CALENDARS:
        return Object.assign({}, state, {
            calendarsLoading: true
        });
    case GET_CALENDARS_SUCCESS:
        action.payload.res.body.calendars.sort(orderCalendarsById);
        return Object.assign({}, state, action.payload.res.body, {
            calendarsLoading: false
        });
    case GET_WIDGETS_SUCCESS:
        return Object.assign({}, state, {
            widgets: action.payload
        });
    case POST_WIDGETS_ERROR:
        return Object.assign({}, state, {
            widgetCreationError: true
        });
    case WIDGET_ERROR_ACKNOWLEDGED:
        return Object.assign({}, state, {
            widgetCreationError: false
        });
    case PUT_CALENDARS_SUCCESS:
        const calendars = state.calendars.map(calendar => {
            if (action.payload.calendarId === calendar.calendar_id) {
                return Object.assign({}, calendar, {
                    selected: action.payload.selected
                });
            }
            return Object.assign({}, calendar);
        });
        return Object.assign({}, state, { calendars });
    case GET_SETTINGS_SUCCESS:
        return Object.assign({}, state, action.payload.body, {
            settingsLoaded: true
        });
    case CANVAS_BACKGROUND_MODIFIED:
        return Object.assign({}, state, {
            canvasBackgroundColor: action.payload
        });
    case GET_CONNECTIONS_SUCCESS:
        return Object.assign({}, state, {
            connections: action.payload,
            connectionsLoading: false
        });
    case GET_CONNECTIONS:
        return Object.assign({}, state, {
            connectionsLoading: true
        });
    case DELETE_CALENDAR:
        return Object.assign(
                {},
                state,
                { deletingCalendar: true },
            {
                connections: state.connections.map(connection => {
                    if (
                            connection.calendarId &&
                            connection.calendarId === action.payload.calendarId
                        ) {
                        connection.loading = true;
                    }

                    if (
                            connection.cronofyAccessTokenId &&
                            connection.cronofyAccessTokenId ===
                                action.payload.cronofyAccessTokenId
                        ) {
                        connection.loading = true;
                    }

                    return connection;
                })
            }
            );
    case DELETE_CALENDAR_SUCCESS:
        return Object.assign({}, state, { deletingCalendar: false });
    default:
        return state;
    }
}
