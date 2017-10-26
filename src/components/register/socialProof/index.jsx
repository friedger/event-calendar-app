require('./style.scss');

import React from 'react';
const Link = require('react-router').Link;

export default React.createClass({
    render() {
        return (
            <div className="row social-proof">
                <div className="col-md-3">
                    <img src="https://dl.airtable.com/LmfJs4S7SGCB6Hcx4okK_full_12108731_10101821325735900_6785087923913876597_n.jpg"></img>
                </div>
                <div className="col-md-9">
                    <p>"I've looked everywhere for a suitable integrated calendar for our website. Events Calender App delivers on every possible front, giving us the perfect solution for our needs."</p>
                    <p className="social-proof__name"><strong>Matt Langford</strong></p>
                    <p><strong><a href="https://landmarklafayette.com/schedule/" target="_blank">Landmark Church</a></strong></p>
                </div>
            </div>
        );
    }
});
