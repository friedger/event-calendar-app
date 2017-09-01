import React from 'react';

export default React.createClass({
    render() {
        return (
            <div>
            <div className="col-md-12">
                <div className={`welcome-card ${this.props.mostPopular ? 'welcome-card--primary' : ''}`}>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className={`welcome-card__header ${this.props.mostPopular ? 'welcome-card--primary__header' : ''}`}>{this.props.header}</div>
                            <div className={`welcome-card__description ${this.props.mostPopular ? 'welcome-card--primary__description' : ''}`}>
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
            {this.props.mostPopular && <div className="col-md-12">
                <div className="welcome-card__recommended">
                    <p>Most Popular!</p>
                </div>
            </div>}
        </div>
        );
    }
});
