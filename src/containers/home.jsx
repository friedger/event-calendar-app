import React from 'react';

export default React.createClass({
    render() {
        if (this.props.children) {
            return (
                <div style={{height: '100%'}}>{this.props.children}</div>
            )
        }
        return(
            <div>This is the home page</div>
        )
    }
});
