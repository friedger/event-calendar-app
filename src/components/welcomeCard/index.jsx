import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="col-md-12">
                <div className="welcome-card">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="welcome-card__header">{this.props.header}</div>
                            <div className="welcome-card__description">
                                <p>
                                    {this.props.description}
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="welcome-card__connect-button">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
