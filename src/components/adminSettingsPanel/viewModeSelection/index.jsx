require('./styles.scss');

import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import React from 'react';

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
            handleSubmit(values => {
                this.props.putSettingsAction(values);
            })();
        });
    },
    visibleLayoutsOnChange(e, field, handleSubmit) {
        field.onChange(e);
        setTimeout(() => {
            handleSubmit(values => {
                this.props.putSettingsAction(values);
            })();
        });
    },
    render() {
        const {
            fields: { listView, gridView, defaultView, boardView },
            handleSubmit
        } = this.props;
        return (
            <Row>
                <Col md={12}>
                    <form>
                        <FormGroup>
                            <Row className="viewmode-selection settings-space settings-space settings-space--bottom-padding-0">
                                <Col md={12}>
                                    <ControlLabel className="setting-title">
                                        Calendar layouts to display
                                    </ControlLabel>
                                </Col>
                                <Col md={12}>
                                    <p className="calendar-selection__description">
                                        The default view cannot be de-selected
                                    </p>
                                </Col>
                                <Col md={12}>
                                    <div className="checkbox">
                                        <input
                                            disabled={
                                                defaultView.value === 'list'
                                            }
                                            id="listview"
                                            name="listview"
                                            onClick={e =>
                                                this.visibleLayoutsOnChange(
                                                    e,
                                                    listView,
                                                    handleSubmit
                                                )}
                                            type="checkbox"
                                            {...listView}
                                        />
                                        <label htmlFor="listview">
                                            <div className="hideOverflow">
                                                List View
                                            </div>
                                        </label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="checkbox">
                                        <input
                                            disabled={
                                                defaultView.value === 'grid'
                                            }
                                            id="gridview"
                                            name="gridview"
                                            onClick={e =>
                                                this.visibleLayoutsOnChange(
                                                    e,
                                                    gridView,
                                                    handleSubmit
                                                )}
                                            type="checkbox"
                                            {...gridView}
                                        />
                                        <label htmlFor="gridview">
                                            <div className="hideOverflow">
                                                Grid View
                                            </div>
                                        </label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="checkbox">
                                        <input
                                            disabled={
                                                defaultView.value === 'board'
                                            }
                                            id="boardview"
                                            name="boardview"
                                            onClick={e =>
                                                this.visibleLayoutsOnChange(
                                                    e,
                                                    boardView,
                                                    handleSubmit
                                                )}
                                            type="checkbox"
                                            {...boardView}
                                        />
                                        <label htmlFor="boardview">
                                            <div className="hideOverflow">
                                                Tile View
                                            </div>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="settings-space">
                                <Col md={12}>
                                    <ControlLabel className="setting-title">
                                        Default calendar layout
                                    </ControlLabel>
                                </Col>
                                <Col md={12}>
                                    <p className="calendar-selection__description">
                                        The layout to be displayed when the
                                        Event Calendar initially loads
                                    </p>
                                </Col>
                                <Col md={12}>
                                    <div className="radio">
                                        <input
                                            inline
                                            name="defaultLayout"
                                            {...defaultView}
                                            id="selectListViewDefault"
                                            onChange={e =>
                                                this.defaultCalendarOnChange(
                                                    e,
                                                    defaultView,
                                                    handleSubmit
                                                )}
                                                checked={defaultView.value === 'list'}
                                                value={'list'}
                                                type="radio"
                                                >
                                            </input>
                                            <label htmlFor="selectListViewDefault">
                                                <div className="hideOverflow">
                                                    List
                                                </div>
                                            </label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="radio">
                                        <input
                                            inline
                                            name="defaultLayout"
                                            id="selectGridViewDefault"
                                            {...defaultView}
                                            onChange={e =>
                                                this.defaultCalendarOnChange(
                                                    e,
                                                    defaultView,
                                                    handleSubmit
                                                )}
                                                checked={defaultView.value === 'grid'}
                                                value={'grid'}
                                                type='radio'
                                                >
                                            </input>
                                            <label htmlFor="selectGridViewDefault">
                                                <div className="hideOverflow">
                                                    Grid View
                                                </div>
                                            </label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="radio">
                                        <input
                                            inline
                                            name="defaultLayout"
                                            {...defaultView}
                                            id="selectTileViewDefault"
                                            onChange={e =>
                                                this.defaultCalendarOnChange(
                                                    e,
                                                    defaultView,
                                                    handleSubmit
                                                )}
                                                checked={defaultView.value === 'board'}
                                                value={'board'}
                                                type={'radio'}
                                                >
                                            </input>
                                            <label htmlFor="selectTileViewDefault">
                                                <div className="hideOverflow">
                                                    Tile View
                                                </div>
                                            </label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <hr />
                                </Col>
                            </Row>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'viewmodeSelection', // a unique name for this form
        fields: ['listView', 'gridView', 'defaultView', 'boardView'],
        overwriteOnInitialValuesChange: false,
        destroyOnUnmount: false
    },
    state => {
        return { initialValues: state.appState };
    }
)(Component));
