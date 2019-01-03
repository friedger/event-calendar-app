import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as appActions from '../../../../actions/index';
import * as calendarActions from '../../../../actions/calendarActions';

import DesignForm from '../../designForm';
import SidePanelWrapper from '../../sidePanelWrapper';
import SidePanelContainer from '../../sidePanelContainer';
import CategoryHeader from '../../categoryHeader';

import featurePermissions from '../../../../utils/featurePermissions';
import get from 'lodash.get';

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
                <CategoryHeader eventCalWidgetUuid={eventCalWidgetUuid} title={'Theme'} />
                <SidePanelWrapper>
                    <DesignForm
                        show={true}
                        onFormChange={putSettings.bind(null, eventCalWidgetUuid)}
                        validWithPlan={featurePermissions.checkFeatureAvailability(userStatus, 'theming')}
                        canvasBackgroundModified={this.props.canvasBackgroundModified}
                    />
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
