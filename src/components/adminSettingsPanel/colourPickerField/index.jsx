import React from 'react';
import cn from 'classnames';
import ColourPicker from '../colourPicker';
import { Row, Col, ControlLabel } from 'react-bootstrap';
import LockedFeature2 from '../lockedFeature2';

export default React.createClass({
    render() {
        const { validWithPlan, handleSubmit, field } = this.props;
        const ignoreClassForReactClickOutside = `react-ignore-field-${field.name}`;
        return (
            <Row className={`settings-space ${this.props.className}`}>
                <LockedFeature2 featureIsLocked={!validWithPlan}>
                    <Col md={12}>
                        <ControlLabel
                            className={cn('setting-title', {
                                'setting-title--strike': !validWithPlan
                            })}
                        >
                            {this.props.title}
                        </ControlLabel>
                        {!validWithPlan && (
                            <div className="locked-icon">
                                <i className="fa fa-lock" aria-hidden="true" />
                            </div>
                        )}
                        <p className="calendar-selection__description">
                            {this.props.description}
                        </p>
                    </Col>
                    {validWithPlan && (
                        <Col md={12}>
                            <div>
                                <ColourPicker
                                    autocomplete="off"
                                    formField={field}
                                    handleSubmit={handleSubmit}
                                    inputOnChange={this.props.inputOnChange}
                                    ignoreClassForReactClickOutside={ignoreClassForReactClickOutside}
                                />
                                {!this.props.valueIsDefault && (
                                    <button
                                        onClick={this.props.resetToDefault.bind(
                                            null,
                                            field.name
                                        )}
                                        type="button"
                                        className={`danger danger--small delete-color ${ignoreClassForReactClickOutside}`}
                                    >
                                        Reset to default
                                    </button>
                                )}
                            </div>
                        </Col>
                    )}
                </LockedFeature2>
            </Row>
        );
    }
});
