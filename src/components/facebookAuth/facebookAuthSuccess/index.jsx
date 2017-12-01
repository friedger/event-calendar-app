import React from 'react';

export default React.createClass({
    componentDidMount() {
        const url = '/facebook/select-page';
        window.opener.open(url, '_self');
        window.opener.focus();
        window.close();
    },
    render() {
        return (
            <div>
                AUTH SUCCESS!
            </div>
        );
    }
});
