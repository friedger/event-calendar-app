import React from 'react';
import cn from 'classnames';

const SidePanelWrapper = React.createClass({
    scrollToTop() {
        const el = this.refs.scrollableArea;
        el.scrollTop = 0;
    },
    render() {
        return (
            <div
                className={cn('row', { 'scrollable-area': this.props.scrollable })}
                style={{ padding: '0 23px 0 30px' }}
                ref="scrollableArea"
            >
                <div className="col-md-12">{this.props.children}</div>
            </div>
        );
    }
});

SidePanelWrapper.defaultProps = {
    scrollable: true
};

export default SidePanelWrapper;
