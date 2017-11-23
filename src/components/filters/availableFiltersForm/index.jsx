require('./style.scss');
import { reduxForm } from 'redux-form';
import React from 'react';
import AvailableFilterOptions from '../availableFilterOptions';

var Component = React.createClass({
    getInitialState() {
        return {
            expandedState: []
        };
    },
    test(handleSubmit, field, e) {
        field.onChange(e);
        handleSubmit(() => {
            this.props.filterSelected({
                selected: e.target.checked,
                filter_id: parseInt(field.name, 10)
            });
        })();
    },
    render() {
        const { fields, handleSubmit } = this.props;
        return (
            <div className="row filters-form">
                <div className="col-md-12">
                    <h4>
                        <strong>Your existing filters</strong>
                    </h4>
                    <form onChange={this.props.onChange}>
                        {Object.keys(fields).map((filterId, index) => {
                            const field = fields[filterId];
                            const filter = this.props.availableFilters.find(
                                theFilter => theFilter.id.toString() === filterId
                            );
                            return (
                                <div key={index}>
                                <label className="filter">
                                    <input
                                        id={index + '-checkbox-eca'}
                                        type="checkbox"
                                        onClick={this.test.bind(null, handleSubmit, field)}
                                        {...field}
                                    />
                                    <label
                                        className="filter__name"
                                        htmlFor={index + '-checkbox-eca'}
                                    >
                                        {filter.name} <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </label>
                                    <AvailableFilterOptions currentFilterName={filter.name} putFilter={this.props.putFilter} filterId={filterId} />
                                </label>
                                <hr></hr>
                                </div>
                            );
                        })}
                    </form>
                </div>
            </div>
        );
    }
});

export default (Component = reduxForm({
    form: 'availableFilters',
    overwriteOnInitialValuesChange: false,
    destroyOnUnmount: false
})(Component));
