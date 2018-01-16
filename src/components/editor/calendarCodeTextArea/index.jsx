require('./style.scss');

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import cn from 'classnames';
import { postOnboarding } from '../../../actions/apiActions';

export default React.createClass({
    getInitialState() {
        return {
            copied: false
        };
    },
    getEmbedString() {
        return (
            '<div class="eca-app-container" data-widgetuuid="' +
            this.props.eventCalWidgetUuid +
            '"></div>\n<script>(function () {\nwindow.eventCalId=' +
            this.props.userId +
            ';\nvar integrationScript = document.createElement("script");\nintegrationScript.async = 1;\nintegrationScript.setAttribute("src", "https://api.eventcalendarapp.com/integration-script.js");\ndocument.head.appendChild(integrationScript);\nif (window.eventCalendarAppUtilities) { window.eventCalendarAppUtilities.init("' +
            this.props.eventCalWidgetUuid +
            '");}})();\n</script>'
        );
    },
    focusOntextAreaText() {
        this.refs.codeTextArea.getDOMNode().select();
    },
    render() {
        return (
            <Row
                className={cn('calendarcode-container', {
                    'calendarcode-container--highlight': this.props.highlight
                })}
            >
                <Col md={12} className="calendarCode">
                    <p>
                        🚧 Copy this code to the part of your website you would like the Event
                        Calendar to appear:
                    </p>
                    <textarea
                        ref="codeTextArea"
                        onClick={this.focusOntextAreaText}
                        readOnly
                        rows="4"
                        cols="50"
                        defaultValue={this.getEmbedString()}
                    />
                    <CopyToClipboard
                        text={this.getEmbedString()}
                        onCopy={() => {
                            this.setState({ copied: true });
                            if (!this.state.copied) {
                                setTimeout(() => {
                                    this.setState({ copied: false });
                                }, 2000);
                            }
                        }}
                    >
                        <button className="action">
                            {this.state.copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </CopyToClipboard>
                    {this.props.highlight && (
                        <button
                            className="positive"
                            onClick={() => {
                                this.props.userSelectedScriptAdded();
                            }}
                        >
                            I've added the script
                        </button>
                    )}
                    {this.props.shopifyUser && (
                        <div className="calendarCode__shopify">
                            <a
                                target="_blank"
                                href="https://support.eventcalendarapp.com/third-party-platform-integration/shopify/how-to-add-your-event-calendar-to-your-shopify-page"
                            >
                                Shopify specific integration instructions
                            </a>
                        </div>
                    )}
                </Col>
            </Row>
        );
    }
});
