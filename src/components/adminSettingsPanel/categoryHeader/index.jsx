import React from 'react';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';

const CategoryHeader = props => {
    function defaultBackAction() {
        props.history.push(`/editor/${props.eventCalWidgetUuid}`);
    }
    const backButtonAction = props.backButtonAction || defaultBackAction;
    return (
        <div className="dashboard-header dashboard-header--right row">
            <div className="col-md-12">
                {props.displayBackButton && (
                    <div
                        className="dashboard-header__back"
                        onClick={backButtonAction}
                    >
                        <i className="fa fa-angle-left" aria-hidden="true" />
                        <div className="text">Back</div>
                    </div>
                )}
                <div className={cn('dashboard-header__event-settings', { 'dashboard-header__event-settings--inline': props.children })}>{props.title}</div>
                {props.children}
            </div>
        </div>
    );
};

CategoryHeader.defaultProps = {
    displayBackButton: true
};

export default withRouter(CategoryHeader);
