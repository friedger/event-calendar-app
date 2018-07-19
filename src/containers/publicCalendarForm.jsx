import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';

import PublicCalendarForm from '../components/editor/publicCalendarForm';

const mapState = ({ widgetState, appState }) => {
    return { widgetState, appState };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...widgetActions
        },
        dispatch
    );
};

const component = React.createClass({
    componentDidMount() {
        this.props.getWidget(this.props.params.eventCalWidgetUuid);
    },
    render() {
        const {
            putWidgetPubliclyAvailable,
            putWidgetAlias,
            params: { eventCalWidgetUuid }
        } = this.props;
        console.log(this.props.widgetState.lastKnownSuccessfulAlias)
        return (
            <PublicCalendarForm
                eventCalWidgetUuid={eventCalWidgetUuid}
                putWidgetPublicAction={putWidgetPubliclyAvailable}
                putWidgetAliasAction={putWidgetAlias}
                aliasSuccess={this.props.widgetState.aliasSuccess}
                aliasFail={this.props.widgetState.aliasFail}
                aliasInvalid={this.props.widgetState.aliasInvalid}
                lastKnownSuccessfulAlias={this.props.widgetState.lastKnownSuccessfulAlias}
            />
        );
    }
});

export default withRouter(connect(mapState, mapDispatch)(component));
