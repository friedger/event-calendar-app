if (typeof window !== 'undefined') {
    require('./style.scss');
}

import {Input, Row, Col} from 'react-bootstrap';

export default React.createClass({
    render() {
        return (
            <Row>
                {this.props.calendars.map(function (calendar) {
                    return (
                        <Col md={3}>
                            <Input type="checkbox" label={calendar.name}/>    
                        </Col>
                    )
                })}
            </Row>
        )
    }
});

import React from 'react';
