require('./style.scss');

import React from 'react';
import cn from 'classnames';

export default React.createClass({
    getInitialState() {
        return {active: true};
    },
    click() {
        var a = new MouseEvent('ECA_toggle-suggestions', {});
        document.dispatchEvent(a);
        this.setState({active: !this.state.active});
        this.props.suggestionToggleAction();
    },
    render() {
        return (
            <div className="suggestions">
                <div className="suggestions__text">Suggestions:</div>
                <label className="switch">
                    <input type="checkbox" />
                    <div className="slider round" onClick={this.click}></div>
                </label>
            </div>
        )
    }
});
