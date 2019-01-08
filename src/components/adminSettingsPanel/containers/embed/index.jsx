import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as appActions from '../../../../actions/index';
import * as calendarActions from '../../../../actions/calendarActions';

import SidePanelWrapper from '../../sidePanelWrapper';
import SidePanelContainer from '../../sidePanelContainer';
import CategoryHeader from '../../categoryHeader';
import CalendarCodetextArea from '../../../editor/calendarCodeTextArea';
import Hint from '../../hint';

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

        return (
            <SidePanelContainer>
                <CategoryHeader eventCalWidgetUuid={eventCalWidgetUuid} title={'Embed'} />
                <SidePanelWrapper>
                    <Hint>
                        <p>Tip: There are two ways you can use your Event Calendar. Either add it to your site via the embed code, or use the direct url.</p>
                    </Hint>
                    <CalendarCodetextArea
                        eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                        userId={this.props.userId}
                        shopifyUser={this.props.shopifyUser}
                        bigcommerceUser={this.props.bigcommerceUser}
                        displayPublicCalendarForm={true}
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
