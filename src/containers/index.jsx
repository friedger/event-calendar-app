import React from 'react';

export default React.createClass({
    render() {
        return (
            <div style={{height: '100%'}}>
                {this.props.children}
            </div>
        )
    }
})
