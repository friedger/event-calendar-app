require('./style.scss');
import React from 'react';
import { reduxForm } from 'redux-form';
import Collapse from 'react-collapse';
import { TwitterPicker } from 'react-color';

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
        const { fields: { color, name } } = this.props;
        console.log(name, 'the name');
        return (
            <div>
                <span
                    className="filter__delete"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <button onClick={e => e.preventDefault()} className="default thin">
                        Options{' '}
                        {this.state.expanded ? (
                            <i className="fa fa-caret-down" aria-hidden="true" />
                        ) : (
                            <i className="fa fa-caret-right" aria-hidden="true" />
                        )}
                    </button>
                </span>
                <div>
                    <Collapse isOpened={this.state.expanded}>
                        <div className="filter-options">
                            <div className="filter-options__option">
                                <span className={'setting-title'}>🖍 Filter Color:</span>
                                <p>All events in this filter will appear with this colour</p>
                                <TwitterPicker
                                    triangle={'hide'}
                                    colors={pickerColours}
                                    color={color.value === null ? false : color.value}
                                    width={260}
                                    onChange={picker => {
                                        if (picker && picker.hex) {
                                            this.props.putFilter({
                                                id: this.props.filterId,
                                                color: picker.hex
                                            });
                                        }
                                    }}
                                />
                            <p className="filter-options__note">
                                Note: Filter colours will not show on the event if you select multiple filters.
                            </p>
                                {color.value && (
                                    <button
                                        className="danger danger--small delete-color filter-options__delete-colour"
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.putFilter({
                                                id: this.props.filterId,
                                                color: null
                                            });
                                        }}
                                    >
                                        Remove filter color
                                    </button>
                                )}
                            </div>
                            <hr />
                            <div className="filter-options__option">
                                <span className={'setting-title'}>Filter name:</span>
                                <p>Change the name of the filter</p>
                                <input
                                    {...name}
                                    placeholder={this.props.currentFilterName}
                                    type="text"
                                    className="form-control"
                                />
                                <button
                                    className="action"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.putFilter({
                                            id: this.props.filterId,
                                            name: name.value
                                        });
                                    }}
                                >
                                    Change name
                                </button>
                            </div>
                            <hr />
                            <div className="filter-options__option">
                                <div className={'setting-title'}>Delete filter</div>
                                <p>This change is irreversible</p>
                                <button
                                    className="danger"
                                    onClick={e => {
                                        e.preventDefault();
                                        const confirmDelete = window.confirm(
                                            'Are you sure you want to delete this filter?'
                                        );
                                        if (confirmDelete) {
                                            this.props.filterDeleted(this.props.filterId);
                                            this.setState({ expanded: false });
                                        }
                                    }}
                                >
                                    Delete filter
                                </button>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
});
export default (Component = reduxForm({
    form: 'availableFilterOptions',
    fields: ['color', 'name']
})(Component));
