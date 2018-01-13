import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="row scrollable-area" style={{ padding: '0 23px 0 30px' }}>
                <div className="col-md-12">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
