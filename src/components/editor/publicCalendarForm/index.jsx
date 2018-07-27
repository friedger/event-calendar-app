import React from 'react';
import './style.scss';
import { reduxForm } from 'redux-form';

import SubdomainInput from './subdomainInput';

var Component = React.createClass({
    clickPublicButton() {
        const currentState = Boolean(this.props.fields.public.value);
        this.props.putWidgetPublicAction(
            !currentState,
            this.props.eventCalWidgetUuid
        );
        this.props.fields.public.onChange(!currentState);
    },
    render() {
        const publicWidget = this.props.fields.public;
        const calendarIsPublic =
            publicWidget.value === true || publicWidget.value === 'true';
        const { eventCalWidgetUuid } = this.props;
        return (
            <div className="public-calendar-form">
                            <SubdomainInput
                                putWidgetAlias={this.props.putWidgetAliasAction}
                                eventCalWidgetUuid={eventCalWidgetUuid}
                                aliasSuccess={this.props.aliasSuccess}
                                aliasFail={this.props.aliasFail}
                                aliasInvalid={this.props.aliasInvalid}
                                lastKnownSuccessfulAlias={this.props.lastKnownSuccessfulAlias}
                                displayDirectUrl={this.props.displayDirectUrl}
                            />
            </div>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'publicCalendarForm', // a unique name for this form
        fields: ['public'],
        overwriteOnInitialValuesChange: true
    },
    state => {
        return { initialValues: state.widgetState.widget };
    }
)(Component));
