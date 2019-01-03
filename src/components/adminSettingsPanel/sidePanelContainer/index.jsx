import React from 'react';

export default React.createClass({
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    'flex-direction': 'column'
                }}
            >
                {this.props.children}
            </div>
        );
    }
});
