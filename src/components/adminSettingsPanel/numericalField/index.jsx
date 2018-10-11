import React from 'react';
import cn from 'classnames';
import { Row, Col, ControlLabel, FormControl } from 'react-bootstrap';
import LockedFeature2 from '../lockedFeature2';

export default React.createClass({
    render() {
        const {
            validWithPlan,
            field,
            onChange,
            onBlur,
            className,
            valueIsDefault,
            resetToDefault
        } = this.props;
        return (
            <Row className={`settings-space ${className}`}>
                <LockedFeature2 featureIsLocked={!validWithPlan}>
                    <Col md={12}>
                        <ControlLabel
                            className="setting-title"
                            className={cn('setting-title', {
                                'setting-title--strike': !validWithPlan
                            })}
                        >
                            Event bottom spacing (px):
                        </ControlLabel>
                        {!validWithPlan && (
                            <div className="locked-icon">
                                <i className="fa fa-lock" aria-hidden="true" />
                            </div>
                        )}
                        <p className="calendar-selection__description">
                            <strong>The gap between each event.</strong>
                        </p>
                    </Col>
                    {validWithPlan && (
                        <Col md={12}>
                            <FormControl
                                type="number"
                                placeholder="5"
                                {...field}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            {!valueIsDefault && (
                                <button
                                    onClick={resetToDefault.bind(
                                        null,
                                        field.name
                                    )}
                                    className="danger danger--small delete-color"
                                >
                                    Reset to default
                                </button>
                            )}
                        </Col>
                    )}
                </LockedFeature2>
            </Row>
        );
    }
});
