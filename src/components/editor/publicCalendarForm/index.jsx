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
                <hr />
                <div className="settings-space settings-space--no-bottom-padding">
                    <div className="public-calendar-form__switch-input">
                        <p className="subtitle">Make this Event Calendar Public</p>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={
                                    publicWidget.value === true ||
                                    publicWidget.value === 'true'
                                }
                                {...publicWidget}
                                onClick={this.clickPublicButton}
                                />
                            <div className="slider round" />
                        </label>
                    </div>
                    <p>
                        This allows people to see your Event Calendar on a
                        seperate page than your website.{' '}
                        <strong>
                            This is required for social media sharing or if you
                            want to share direct links to your events.
                        </strong>
                    </p>
                </div>
                {calendarIsPublic && (
                            <SubdomainInput
                                putWidgetAlias={this.props.putWidgetAliasAction}
                                eventCalWidgetUuid={eventCalWidgetUuid}
                                aliasSuccess={this.props.aliasSuccess}
                                aliasFail={this.props.aliasFail}
                                aliasInvalid={this.props.aliasInvalid}
                                lastKnownSuccessfulAlias={this.props.lastKnownSuccessfulAlias}
                            />
                )}
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
