require('./style.scss');
import React from 'react';
import { reduxForm } from 'redux-form';
import Collapse from 'react-collapse';
import { TwitterPicker } from 'react-color';
import { ControlLabel } from 'react-bootstrap';

const pickerColours = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39'
];

var Component = React.createClass({
    getInitialState() {
        return {
            expanded: false
        };
    },
    render() {
        const { fields: { colour }, handleSubmit } = this.props;
        return (
            <div>
                <span
                    className="filter__delete"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    Options <i className="fa fa-caret-down" aria-hidden="true" />
                </span>
                <Collapse isOpened={this.state.expanded}>
                    <div className="filter-options">
                        <div className="filter-options__option">
                            <span
                                className={'setting-title'}
                                >
                                🖍 Filter Color:
                            </span>
                            <p>All events in this filter will appear with this colour</p>
                            <TwitterPicker triangle={'hide'} colors={pickerColours} width={260} />
                        </div>
                        <span
                            className={'setting-title'}
                        >
                            Filter name:
                        </span>
                        <p>Change the name of the filter</p>
                        <input type="text" className="form-control" />
                        <button className="default">Change name</button>
                    </div>
                </Collapse>
            </div>
        );
    }
});
export default (Component = reduxForm({
    form: 'availableFilterOptions',
    fields: ['colour', 'name']
})(Component));
