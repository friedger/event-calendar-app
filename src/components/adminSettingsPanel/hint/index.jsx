require('./style.scss');
import React from 'react';
import cn from 'classnames';
export default React.createClass({
    render() {
        return (
            <div
                className={cn('eca-hint', { 'eca-hint--secondary': this.props.type === 'secondary' })}
            >
                {this.props.children}
            </div>
        );
    }
});
