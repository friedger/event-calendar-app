require('./style.scss');
import React from 'react';
import { Link } from "react-router-dom";

export default React.createClass({
    render() {
        return (
            <div className="theContainer">
                <div className="start-trial-container">
                    <p>
                        Add this Event Calendar to your website{' '}
                    </p>
                    <Link
                        className="start-trial start-trial--no-margin"
                        to="/account"
                        >
                        Start your free trial
                    </Link>
                </div>
            </div>
        );
    }
});
