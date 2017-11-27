import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as filterActions from '../actions/filterActions';
import { Modal } from 'react-bootstrap';
import AvailableFiltersForm from '../components/filters/availableFiltersForm';
import CreateFiltersForm from '../components/filters/createFiltersForm';
import NoAvailableFiltersMessage from '../components/filters/noAvailableFiltersMessage';
import LockedFeature from '../components/lockedFeature';
import get from 'lodash.get';

import featurePermissions from '../utils/featurePermissions';

const mapState = ({ filterState, eventState, form, appState }) => {
    return {
        filterState,
        eventState,
        form,
        appState
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
    createFilterSubmitted(values) {
        this.props.postFilter(values);
    },
    filterDeleted(values) {
        this.props.deleteFilter({ id: values });
    },
    validWithPlan() {
        return get(this, 'props.appState.user.status') &&
        featurePermissions.checkFeatureAvailability(
            this.props.appState.user.status,
            'event-settings'
        );
    },
    render() {
        const { availableFilters } = this.props.filterState;
        return (
            <div>
                {this.validWithPlan() ? <button
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({ modalOpen: true });
                    }}
                    className="secondary"
                >
                    Manage Filters
                </button>
                :
                <LockedFeature columns={0} title={'Upgrade your account'} />
                }
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
                                {availableFilters && availableFilters.length === 0 && <NoAvailableFiltersMessage></NoAvailableFiltersMessage>}
                                {availableFilters && availableFilters.length > 0 && <AvailableFiltersForm
                                    fields={availableFilters.map(filter => filter.id.toString())}
                                    availableFilters={availableFilters}
                                    filterSelected={this.filterSelected}
                                    initialValues={this.filtersInitialState()}
                                    filterDeleted={this.filterDeleted}
                                    putFilter={this.props.putFilter}
                                />}
                            <CreateFiltersForm onSubmit={this.createFilterSubmitted}></CreateFiltersForm>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
