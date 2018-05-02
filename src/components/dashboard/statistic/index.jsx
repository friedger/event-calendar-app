require('./style.scss');
import React from 'react';
var LineChart = require('react-chartjs').Line;
import Loader from 'react-loader';

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

export default React.createClass({
    getInitialState() {
        return {};
    },
    componentWillMount() {
        this.setState({
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0)',
                    strokeColor: this.props.color,
                    pointColor: this.props.color,
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: this.props.color,
                    data: this.props.data
                }
            ]
        });
    },
    render() {
        const { data, name, color } = this.props;

        const graphData = {
            labels: ['January', 'February', 'March', 'April', 'May'],
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
        return (
            <div className="col-md-3">
                <div className="statistic__container">
                    {!this.props.loading && (
                        <div>
                            <div className="statistic__value">{data[data.length - 1]}</div>
                            <div className="statistic__value-name">{name}</div>
                            <LineChart
                                redraw
                                data={graphData}
                                options={options}
                                width="400"
                                height="100"
                            />
                        </div>
                    )}
                    {this.props.loading && (
                        <div>
                            <div className="statistic__value">
                                <Loader type="spin" color="#000" width={3} radius={7} />
                            </div>
                            <div className="statistic__value-name">{name}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
});
