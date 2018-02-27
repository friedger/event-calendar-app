require('./style.scss');
import React from 'react';

export default React.createClass({
    getInitialState() {
        return {
            open: true
        };
    },
    render() {
        return (
            <div>
                {this.state.open && (
                    <div className="start-trial-container">
                        <span
                            className="back-to-weebly-message__close"
                            onClick={() => {
                                this.props.close();
                                this.setState({ open: false });
                            }}
                        >
                            <i className="fa fa-times" />
                        </span>
                        <p>Changes here will be automatically reflected in Weebly</p>
                        <a
                            href="https://www.weebly.com/editor/main.php"
                            target="_blank"
                            className="start-trial start-trial--no-margin"
                        >
                            Back to Weebly Dashboard
                        </a>
                    </div>
                )}
            </div>
        );
    }
});
