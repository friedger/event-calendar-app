import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="head-back-to-weebly">
                <p>
                    <strong>That's it.</strong> Head back to your{' '}
                    <a
                        target="_blank"
                        href="https://www.weebly.com/editor/main.php"
                    >
                        weebly dashboard
                    </a>{' '}
                    to see your updated calendar!
                </p>
                <a
                    href="https://www.weebly.com/editor/main.php"
                    className="weebly-button inline-button action-button btn btn-default"
                >
                    Back to Weebly Dashboard
                </a>
            </div>
        );
    }
});
