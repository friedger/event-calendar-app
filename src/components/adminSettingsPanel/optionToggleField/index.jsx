import React from 'react';
import { Col } from 'react-bootstrap';
import LockedFeature2 from '../lockedFeature2';
import cn from 'classnames';

export default React.createClass({
    render() {
        const {
            validWithPlan,
            field,
            title,
            description,
            lockedMessage
        } = this.props;
        return (
            <LockedFeature2
                title={lockedMessage}
                featureIsLocked={!validWithPlan}
            >
                <Col md={12}>
                    <div
                        className={cn('checkbox', {
                            locked: !validWithPlan
                        })}
                    >
                        {validWithPlan && (
                            <input
                                id={field.name}
                                name={field.name}
                                onClick={this.props.inputOnClick}
                                type="checkbox"
                                {...field}
                                disabled={this.props.disabled}
                            />
                        )}
                        <label htmlFor={field.name}>
                            <div className="hideOverflow setting-title">
                                {title}
                            </div>
                        </label>
                        {!validWithPlan &&
                            <div className="locked-icon">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </div>
                        }
                    </div>
                    <p
                        className={cn(
                            'calendar-selection__description checkbox-description',
                            { locked: !validWithPlan }
                        )}
                    >
                        {description}
                    </p>
                </Col>
            </LockedFeature2>
        );
    }
});
