require('./style.scss');
import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="eca-dashboard__no-events-message-container">
                        <a className="eca-dashboard__no-events-message filters venobox vbox-item">
                            <p className="light">Add a filter to get started, or click here for a quick video intro.</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
