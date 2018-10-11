import React from 'react';
import EmbedCode from '../../editor/embedCode';

export default React.createClass({
    render() {
        const {
            eventActivated,
            displayEmbedCode,
            addingEvent,
            user,
            displayBackButton,
            closeAction
        } = this.props;
        return (
            <div className="dashboard-header dashboard-header--right row">
                <div className="col-md-12">
                    {displayBackButton && (
                        <div
                            className="dashboard-header__back"
                            onClick={closeAction}
                        >
                            <i className="fa fa-angle-left" aria-hidden="true" />
                            <div className="text">Back</div>
                        </div>
                    )}
                    {eventActivated && (
                        <div className="dashboard-header__event-settings">
                            Event settings
                        </div>
                    )}
                    {addingEvent && (
                        <div className="dashboard-header__event-settings">
                            Add new event
                        </div>
                    )}
                    {!eventActivated &&
                        !addingEvent && (
                            <span className="dashboard-header__event-settings">
                                Event calendar settings
                            </span>
                        )}
                    {displayEmbedCode && (
                        <EmbedCode
                            eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                            userIsAGuest={this.props.userIsAGuest}
                            shopifyUser={user.shopifyUser}
                            bigcommerceUser={user.bigcommerceUser}
                            userId={user.userId}
                        />
                    )}
                </div>
            </div>
        );
    }
});
