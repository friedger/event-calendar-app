import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as filterActions from '../actions/filterActions';
import { Modal } from 'react-bootstrap';
import AvailableFiltersForm from '../components/filters/availableFiltersForm';

const mapState = ({ filterState, eventState, form }) => {
    return {
        filterState,
        eventState,
        form
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...filterActions
        },
        dispatch
    );
};

const component = React.createClass({
    getInitialState() {
        return {
            modalOpen: false
        };
    },
    componentDidMount() {
        this.props.getAvailableFilters();
    },
    filterSelected(value) {
        const calendar_id = this.props.eventState.calendar_id;
        const uuid = this.props.eventState.uuid;
        const assignFilterData = Object.assign(value, { calendar_id, uuid });
        this.props.assignFilter(assignFilterData);
    },
    filtersInitialState() {
        const state = this.props;
        const allFilters = state.filterState.availableFilters;
        var returnValue;

        if (!state.eventState.filters) {
            returnValue = {
                initialValues: allFilters.map(filter => filter.id).reduce((collection, current) => {
                    collection[current] = false;
                    return collection;
                }, {})
            };
            return returnValue.initialValues;
        }
        const activeFilters = state.eventState.filters.map(filter => filter.filter_id);
        const initialState = allFilters.map(filter => filter.id).reduce((collection, current) => {
            collection[current] = activeFilters.indexOf(current) > -1;
            return collection;
        }, {});
        returnValue = { initialValues: initialState };
        return returnValue.initialValues;
    },
    render() {
        const { availableFilters } = this.props.filterState;
        return (
            <div>
                <button
                    onClick={() => {
                        this.setState({ modalOpen: true });
                    }}
                    className="secondary"
                >
                    Manage
                </button>
                <Modal
                    show={this.state.modalOpen}
                    onHide={() => this.setState({ modalOpen: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Filters</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            <h4>
                                <strong>Available filters</strong>
                            </h4>
                                <AvailableFiltersForm
                                    fields={availableFilters.map(filter => filter.id.toString())}
                                    availableFilters={availableFilters}
                                    filterSelected={this.filterSelected}
                                    initialValues={this.filtersInitialState()}
                                />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
