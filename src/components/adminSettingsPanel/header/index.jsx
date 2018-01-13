import React from 'react';

export default React.createClass({
    render() {
        const { eventActivated, displayEmbedCode, addingEvent } = this.props;
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
                        <EmbedCode />
                    )}
                </div>
            </div>
        );
    }
});
