require('./style.scss');
import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="row noAvailableFilters">
                <div className="col-md-12">
                    <div className="eca-dashboard__no-filters-message-container">
                        <a className="eca-dashboard__no-events-message filters venobox vbox-item">
                            <p className="light">Add a filter to get started</p>
                            <p className="light">...or watch this video for a quick explanation.</p>
                            <iframe
                                allowFullScreen="allowfullscreen"
                                mozallowfullscreen="mozallowfullscreen"
                                msallowfullscreen="msallowfullscreen"
                                oallowfullscreen="oallowfullscreen"
                                webkitallowfullscreen="webkitallowfullscreen"
                                width="100%"
                                height="315"
                                src="https://player.vimeo.com/video/310195699"
                                frameborder="0"
                                gesture="media"
                                allowfullscreen
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
