import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../../../../actions/index';
import * as calendarActions from '../../../../actions/calendarActions';

import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import featurePermissions from '../../../../utils/featurePermissions';
import get from 'lodash.get';
import NumberOfEventsToDisplay from '../../numberOfEventsSelection';
import TimezoneSelection from '../../timezoneSelection';
import ViewModeSelection from '../../viewModeSelection';
import MapsSelection from '../../mapsSelection';
import SocialSelection from '../../socialSelection';
import SubscriptionButtonSelection from '../../subscriptionButtonSelection';
import CategoryHeader from '../../categoryHeader';
import SidePanelWrapper from '../../sidePanelWrapper';
import SidePanelContainer from '../../sidePanelContainer';

const mapState = state => {
    return {
        userStatus: get(state, 'appState.user.status')
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions
        },
        dispatch
    );
};

const component = React.createClass({
    render() {
        const eventCalWidgetUuid = this.props.match.params.eventCalWidgetUuid;
        const putSettings = this.props.putSettings;
        const userStatus = this.props.userStatus;

        return (
            <SidePanelContainer>
                <CategoryHeader eventCalWidgetUuid={eventCalWidgetUuid} title={'Settings'} />
                <SidePanelWrapper>
                    <div className={cn('layout-options-container', 'show')}>
                        <ViewModeSelection putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)} />
                        <NumberOfEventsToDisplay putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)} />
                        <TimezoneSelection putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)} />
                        <MapsSelection
                            putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)}
                            validWithPlan={featurePermissions.checkFeatureAvailability(userStatus, 'maps')}
                        />
                        <SocialSelection
                            putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)}
                            validWithPlan={featurePermissions.checkFeatureAvailability(userStatus, 'social')}
                        />
                        <SubscriptionButtonSelection
                            validWithPlan={featurePermissions.checkFeatureAvailability(userStatus, 'subscriptions')}
                            putSettingsAction={this.props.putSettings.bind(null, eventCalWidgetUuid)}
                        />
                    </div>
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
