import React from 'react';
import cn from 'classnames';
import { Row, Col, ControlLabel } from 'react-bootstrap';
import LockedFeature2 from '../lockedFeature2';

export default React.createClass({
    render() {
        const {
            validWithPlan,
            field,
            onChange,
            onBlur,
            resetToDefault,
            className
        } = this.props;
        return (
            <Row className={`settings-space ${className}`}>
                <LockedFeature2 featureIsLocked={!validWithPlan}>
                    <Col md={12}>
                        <ControlLabel
                            className={cn('setting-title', 'no-description', {
                                'setting-title--strike': !validWithPlan
                            })}
                        >
                            Font:
                        </ControlLabel>
                        {!validWithPlan && (
                            <div className="locked-icon">
                                <i className="fa fa-lock" aria-hidden="true" />
                            </div>
                        )}
                    </Col>
                    {validWithPlan && (
                        <Col md={12}>
                            <select
                                className="form-control"
                                {...field}
                                onChange={onChange}
                                onBlur={onBlur}
                            >
                                {this.props.children}
                            </select>
                            {!this.props.valueIsDefault && (
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
