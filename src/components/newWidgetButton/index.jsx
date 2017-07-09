require('./style.scss');

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="col-md-3 new-widget" onClick={() => this.props.onClick()}>
                <i className="fa fa-plus" aria-hidden="true"></i>
                <div className="new-widget__text">Create a new Events Calendar</div>
            </div>
        )
    }
});
