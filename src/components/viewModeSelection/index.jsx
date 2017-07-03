if (typeof window !== 'undefined') {
    require('./styles.scss');
}

import {Input, Row, Col, Checkbox, FormGroup, ControlLabel, Radio} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import debounce from 'lodash.debounce';

var Component = React.createClass({
    defaultCalendarOnChange(e, field, handleSubmit) {

        if (e.target.value === 'grid') {
            this.props.fields.gridView.onChange(true);
        }

        if (e.target.value === 'list') {
            this.props.fields.listView.onChange(true);
        }

        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => {this.props.putSettingsAction(values)})();
        });
    },
    visibleLayoutsOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => {this.props.putSettingsAction(values)})();
        });
    },
    render() {
        const { fields: {
            listView,
            gridView,
            defaultView
        }, handleSubmit, submitting } = this.props;
        return (
            <Row>
                <Col md={12}>
                <form>
                    <FormGroup>
                        <Row className="viewmode-selection settings-space settings-space">
                            <Col md={12}>
                                <ControlLabel className="setting-title">Default calendar layout:</ControlLabel>
                            </Col>
                            <Col md={12}>
                                <p className="calendar-selection__description">The default view cannot be de-selected</p>
                            </Col>
                            <Col md={4}>
                                <div className="checkbox">
                                    <input disabled={defaultView.value === 'list'} id="listview" name="listview" onClick={(e) => this.visibleLayoutsOnChange(e, listView, handleSubmit)} type="checkbox" {...listView}/>
                                    <label htmlFor="listview">
                                        <div className="hideOverflow">List View</div>
                                    </label>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="checkbox">
                                    <input disabled={defaultView.value === 'grid'} id="gridview" name="gridview" onClick={(e) => this.visibleLayoutsOnChange(e, gridView, handleSubmit)} type="checkbox" {...gridView}/>
                                    <label htmlFor="gridview">
                                        <div className="hideOverflow">Grid View</div>
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="settings-space">
                            <Col md={8}>
                                <ControlLabel className="setting-title">Calendar layouts to display:</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <Radio inline name="defaultLayout" {...defaultView} onChange={(e) => this.defaultCalendarOnChange(e, defaultView, handleSubmit)} checked={defaultView.value === 'list'} value={'list'}>List</Radio>
                                <Radio inline name="defaultLayout" {...defaultView} onChange={(e) => this.defaultCalendarOnChange(e, defaultView, handleSubmit)} checked={defaultView.value === 'grid'} value={'grid'}>Grid</Radio>
                            </Col>
                        </Row>
                    </FormGroup>
                </form>
            </Col>
            </Row>
        )
    }
});

export default Component = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'viewmodeSelection', // a unique name for this form
    fields: ['listView', 'gridView', 'defaultView']
}, state => ({initialValues: state.appState}))(Component);

import React from 'react';
