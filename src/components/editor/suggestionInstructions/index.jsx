require('./style.scss');

import React from 'react';
import cn from 'classnames';

export default React.createClass({
    render() {
        return (
            <div className={cn('suggestion-instructions-container', {show: this.props.show})}>
                <div className="suggestion-instructions">
                Suggestions can be clicked and give you tips on how to improve your calendar
                </div>
            </div>
        )
    }
});
