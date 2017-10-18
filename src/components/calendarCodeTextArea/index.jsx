if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import {Row, Col} from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

export default React.createClass({
    getEmbedString() {
        return '<div id="app-container"></div><script>(function () {\nwindow.eventCalId='+ this.props.userId +';\nwindow.eventCalWidgetUuid="' + this.props.eventCalWidgetUuid + '";\nvar integrationScript = document.createElement("script");\nintegrationScript.async = 1;\nintegrationScript.setAttribute("src", "https://api.eventcalendarapp.com/integration-script.js");\ndocument.head.appendChild(integrationScript);\n})();\n</script>';
    },
    render() {
        return (
            <Row className="calendarcode-container">
                <Col md={12} className="calendarCode">
                    <p>Copy and paste the below onto your site:</p>
                    <textarea readOnly rows="4" cols="50" defaultValue={this.getEmbedString()} />
                    <CopyToClipboard text={this.getEmbedString()}>
                        <button className="action">Copy Code</button>
                    </CopyToClipboard>
                    <div className="calendarCode__shopify">{this.props.shopifyUser && <a target="_blank" href="https://support.eventcalendarapp.com/third-party-platform-integration/shopify/how-to-add-your-event-calendar-to-your-shopify-page">Shopify specific integration instructions</a>}</div>
                </Col>
            </Row>
        )
    }
});
