if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import {Row, Col} from 'react-bootstrap';

const component = () => (
    <Row>
        <Col md={12}>
        <div className="header">
            <h1>Create your calendar</h1>
        </div>
        </Col>
    </Row>
);

export default component;
