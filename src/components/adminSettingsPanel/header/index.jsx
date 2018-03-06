import React from 'react';
import EmbedCode from '../../editor/embedCode';

export default React.createClass({
    render() {
        const { eventActivated, displayEmbedCode, addingEvent, user } = this.props;
        console.log(this.props.user)
        return (
            <div className="dashboard-header dashboard-header--right row">
                <div className="col-md-12">
                    {eventActivated && (
                        <span className="dashboard-header__event-settings">Event settings</span>
                    )}
                    {addingEvent && (
                        <span className="dashboard-header__event-settings">Add new event</span>
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
