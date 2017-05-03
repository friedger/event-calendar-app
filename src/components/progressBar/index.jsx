require('./style.scss');

import React from 'react';

module.exports = React.createClass({
    render() {
        return (
            <div className='success-bar'>

                <div className="success-bar__linking-bar success-bar__linking-bar--completed"></div>
                <div className="success-bar__linking-bar success-bar__linking-bar--uncompleted"></div>
                
                <div className="success-bar__success-point-container register">
                    <div className="success-bar__icon-container success-bar__icon-container--completed">
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </div>
                    <div className="success-bar__text success-bar__text--completed">1) Register</div>
                </div>
                <div className="success-bar__success-point-container connect">
                    <div className="success-bar__icon-container success-bar__icon-container--in-progress">
                        <i className="fa fa-cloud-download" aria-hidden="true"></i>
                    </div>
                    <div className="success-bar__text">2) Connect</div>
                </div>
                <div className="success-bar__success-point-container calendar">
                    <div className="success-bar__icon-container success-bar__icon-container--uncompleted">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                    </div>
                    <div className="success-bar__text success-bar__text--uncompleted">3) Events calendar</div>
                </div>
            </div>
        );
    }
});
