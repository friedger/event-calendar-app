if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default (props) => (
    <Row>
        <Col md={12} className="calendarCode">
            <p>2) Copy and paste the below onto your site</p>
            <textarea rows="4" cols="50" defaultValue={'<div id="app-container"></div><script>window.eventCalId='+ props.userId +';var mainScript=document.createElement("script");mainScript.setAttribute("src","' + props.calendarBuildUrl + '/main.js"),document.head.appendChild(mainScript);var stylesheet=document.createElement("link");stylesheet.setAttribute("href","' + props.calendarBuildUrl + '/styles.css"),stylesheet.setAttribute("rel","stylesheet"),document.head.appendChild(stylesheet);var googleMaps=document.createElement("script");googleMaps.setAttribute("src","https://maps.googleapis.com/maps/api/js"),document.head.appendChild(googleMaps);var fontAwesome=document.createElement("link");fontAwesome.setAttribute("href","https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"),fontAwesome.setAttribute("rel","stylesheet"),document.head.appendChild(fontAwesome);</script>'} />
        </Col>
    </Row>
);
