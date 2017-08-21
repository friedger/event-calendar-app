import React from 'react';

export default React.createClass({
    componentDidMount() {
        window.close();
    },
    render() {
        return (
            <div>
                Auth Failed
            </div>
        );
    }
});
