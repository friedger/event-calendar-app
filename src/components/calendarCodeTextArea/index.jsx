if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default (props) => (
    <Row>
        <Col md={12} className="calendarCode">
            <p>2) Copy and paste the below onto your site</p>
            <textarea readOnly rows="4" cols="50" defaultValue={'<div id="app-container"></div><script>(function () {\nwindow.eventCalId='+ props.userId +';\nvar integrationScript = document.createElement("script");\nintegrationScript.async = 1;\nintegrationScript.setAttribute("src", "https://api.eventcalendarapp.com/integration-script.js");\ndocument.head.appendChild(integrationScript);\n})();\n</script>'} />
        </Col>
    </Row>
);
