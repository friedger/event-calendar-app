import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="modal-container">
                <h3>One last step:</h3>
                <p>You are billed through Shopify. To complete your cancellation you need to uninstall the 'Event Calendar App' application on Shopify.</p>
                <img className="gif-image" alt="linking calendars" src="/images/docs/shopify-uninstall.gif"></img>
            </div>
        )
    }
});
