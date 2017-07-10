require('./style.scss');

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="col-md-3" onClick={() => this.props.onClick()}>
                <div className="new-widget">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <div className="new-widget__text">Create a new Events Calendar</div>
                </div>
            </div>
        )
    }
});
