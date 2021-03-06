require('./style.scss');
import React from 'react';
var LineChart = require('react-chartjs').Line;
import Loader from 'react-loader';
import cn from 'classnames';
import { Link } from "react-router-dom";

const options = {
    title: { display: false },
    scaleShowLabels: false,
    showScale: false,
    scaleShowGridLines: false,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    datasetStrokeWidth: 6,
    showTooltips: false,
    pointDot: false,
    responsive: true,
    hover: { mode: 'index' }
};

const Statistic = React.createClass({
    getInitialState() {
        return {};
    },
    render() {
        const { data, name, color } = this.props;

        const graphData = {
            labels: ['January', 'February', 'March'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0)',
                    strokeColor: color,
                    pointColor: color,
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: color,
                    data: data
                }
            ]
        };
        const {
            error,
            displayUpgradeMessage,
            loading,
            disabled,
            displayCollectingDataMessage
        } = this.props;
        return (
            <div className="col-md-3">
                <div className={'statistic__container'}>
                    {error && (
                        <div>
                            <p>We're currently having some trouble fetching your analytics.</p>
                            <button className="secondary" onClick={() => this.props.tryAgainButtonAction()}>Try again</button>
                        </div>
                    )}
                    {displayUpgradeMessage && (
                        <div className="statistic__upgrade-overlay">
                            <p>Get access to analytics</p>
                            <Link to="/account" className="secondary">
                                Start plan
                            </Link>
                        </div>
                    )}
                    {!loading &&
                        !error && (
                            <div
                                className={cn({
                                    disabled: disabled || displayCollectingDataMessage
                                })}
                            >
                                <div className="statistic__value">{data[data.length - 1]}
                                    {this.props.helpUrl &&
                                        <a href={this.props.helpUrl} target="_blank"><i className="fa fa-info-circle" aria-hidden="true"></i></a>
                                    }
                                </div>
                                <div className="statistic__value-name">{name}</div>
                            </div>
                        )}
                    {loading && (
                        <div>
                            <div className="statistic__value-name">{name}</div>
                            <div className="statistic__loader">
                                <Loader type="spin" color="#000" width={3} radius={7} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
});

export default Statistic;
