require('./style.scss');
import { reduxForm } from 'redux-form';
import React from 'react';
var Component = React.createClass({
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
            <form onChange={this.props.onChange}>
                {Object.keys(fields).map((filterId, index) => {
                    const field = fields[filterId];
                    const filter = this.props.availableFilters.find(
                        theFilter => theFilter.id.toString() === filterId
                    );
                    return (
                        <label className="filter" key={index}>
                            <input
                                id={index + '-checkbox-eca'}
                                type="checkbox"
                                onClick={this.test.bind(null, handleSubmit, field)}
                                {...field}
                            />
                            <label className="filters__name" htmlFor={index + '-checkbox-eca'}>
                                {filter.name}
                            </label>
                        </label>
                    );
                })}
            </form>
        );
    }
});

export default (Component = reduxForm(
    {
        form: 'availableFilters',
        overwriteOnInitialValuesChange: true,
        destroyOnUnmount: false
    }
)(Component));
