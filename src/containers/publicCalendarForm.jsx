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
    render() {
        const {
            putWidgetPubliclyAvailable,
            putWidgetAlias
        } = this.props;
        const eventCalWidgetUuid = this.props.match.params.eventCalWidgetUuid;
        return (
            <PublicCalendarForm
                eventCalWidgetUuid={eventCalWidgetUuid}
                putWidgetPublicAction={putWidgetPubliclyAvailable}
                putWidgetAliasAction={putWidgetAlias}
                aliasSuccess={this.props.widgetState.aliasSuccess}
                aliasFail={this.props.widgetState.aliasFail}
                aliasInvalid={this.props.widgetState.aliasInvalid}
                lastKnownSuccessfulAlias={this.props.widgetState.lastKnownSuccessfulAlias}
                displayDirectUrl={this.props.displayDirectUrl}
                subdomainFlexDirection={this.props.subdomainFlexDirection}
                viewmode={this.props.viewmode}
            />
        );
    }
});

export default withRouter(connect(mapState, mapDispatch)(component));
