require('./style.scss');
import React from 'react';
import { Link } from "react-router-dom";

export default React.createClass({
    render() {
        return (
            <Link className="theContainer" to="/account">
                <div className="start-trial-container">
                    <Link
                        className="button secondary secondary--inverse"
                        to="/account"
                        >
                        Add this Event Calendar to your site by starting a plan
                    </Link>
                </div>
            </Link>
        );
    }
});
