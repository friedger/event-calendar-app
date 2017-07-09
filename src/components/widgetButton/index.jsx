require('./style.scss');

import React from 'react';
const Link = require('react-router').Link;

export default React.createClass({
    render() {
        return (
            <Link to={`/dashboard/${this.props.widget.uuid}`}>
            <div className="col-md-3 widget-button">
                <div className="widget-button__text">
                    Calendar {this.props.number}
                </div>
            </div>
            </Link>
        )
    }
});
