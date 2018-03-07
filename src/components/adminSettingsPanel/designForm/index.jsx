require('./style.scss');
import React from 'react';
import cn from 'classnames';
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import debounce from 'lodash.debounce';
import LockedFeature from '../lockedFeature';
import { ChromePicker } from 'react-color';
import ColourPicker from '../colourPicker';
import SettingsCategorySelection from '../settingsCategorySelection';
import defaultDesignSettings from './defaults';
import DesignPresets from '../designPresets';

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

const fontList = [
    'Open Sans',
    'Josefin Slab',
    'Arvo',
    'Lato',
    'Vollkorn',
    'Abril Fatface',
    'Ubuntu',
    'PT Sans + PT Serif',
    'Old Standard TT',
    'Droid Sans',
    'Nunito',
    'Montserrat'
];

var Component = React.createClass({
    getInitialState() {
        return { widgetsInit: false, settingClicked: 'List view', designPageToDisplay: 'Presets' };
    },
    refreshCalendar(e, handleSubmit) {
        e.preventDefault();
        handleSubmit(values => this.makeApiCall(values))();
    },
    settingClicked(setting) {
        this.setState({settingClicked: setting});
    },
    desginSettingClicked(setting) {
        this.setState({ designPageToDisplay: setting });
    },
    finishEditing(e) {
        e.preventDefault();
        this.props.exitAction();
    },
    componentWillMount() {
        this.makeApiCall = debounce(values => {
            console.log('its hitting herrrrreee');
            this.props.onFormChange(values);
        }, 1000);
    },
    inputOnBlur(e, field) {
        field.onChange(e);
    },
    inputOnChange(e, field, handleSubmit) {
        console.log('input on change blah blah')
        field.onChange(e);
        // Settimeout ensures we include the latest value
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(values))();
        }, 0);
    },
    changeInputsToPresetValue(preset) {
        Object.keys(preset).forEach(presetKey => {
            this.props.fields[presetKey].onChange(preset[presetKey]);
        });
    },
    resetToDefault(fieldName, e) {
        e.preventDefault();
        const onChangeObj = {};
        onChangeObj[fieldName] = defaultDesignSettings[fieldName];
        console.log('its fesseettt');
        this.props.onFormChange(onChangeObj);
        this.props.fields[fieldName].onChange(defaultDesignSettings[fieldName]);

        if (fieldName === 'canvasBackgroundColor') {
            return this.props.canvasBackgroundModified('#fff');
        }
    },
    valueIsDefault(fieldName) {
        return this.props.fields[fieldName].value === defaultDesignSettings[fieldName];
    },
    render() {
        const {
            validWithPlan,
            fields: {
                listViewBackgroundColor,
                listViewBorderColor,
                listViewEventBottomMargin,
                listViewTextColor,
                canvasBackgroundColor,
                gridViewBackgroundColor,
                gridViewBorderColor,
                secondaryBackgroundColor,
                font,
                highlightColor
            },
            handleSubmit
        } = this.props;
        return (
            <div>
                {this.props.show && <SettingsCategorySelection
                    options={[
                        { name: 'Presets', emoji: '' },
                        { name: 'Customise', emoji: '' }
                    ]}
                    settingClicked={this.desginSettingClicked}
                />}
                <DesignPresets
                    show={
                        this.props.show && this.state.designPageToDisplay === 'Presets'
                    }
                    validWithPlan={validWithPlan}
                    fields={this.props.fields}
                    onFormChange={this.props.onFormChange}
                    canvasBackgroundModified={this.props.canvasBackgroundModified}
                />
            <form
                ref="settingsForm"
                className="design-form"
                className={cn('form-horizontal', 'design-form', { show: this.props.show && this.state.designPageToDisplay === 'Customise' })}
                onSubmit={() => {}}
            >
                <FormGroup>
                    <Row className="settings-space">
                        <Col md={6}>
                            <ControlLabel
                                className={cn('setting-title', {
                                    'setting-title--strike': !validWithPlan
                                })}
                            >
                                Canvas background color:
                            </ControlLabel>
                            <p className="calendar-selection__description"><strong>This will have no effect on your website.</strong> However, it lets you design your Event Calendar with the same background as is on your website.</p>
                        </Col>
                        {validWithPlan && (
                            <Col md={6}>
                                <div>
                                    <ColourPicker
                                        formField={canvasBackgroundColor}
                                        handleSubmit={handleSubmit}
                                        inputOnChange={(picker, e) => {
                                            this.props.canvasBackgroundModified(picker.hex);
                                            this.inputOnChange(
                                                picker && picker.hex,
                                                canvasBackgroundColor,
                                                handleSubmit
                                            );
                                        }}
                                        />
                                    {!this.valueIsDefault('canvasBackgroundColor') && (
                                        <button
                                            type="button"
                                            onClick={this.resetToDefault.bind(
                                                null,
                                                'canvasBackgroundColor'
                                            )}
                                            type="button"
                                            className="danger danger--small delete-color"
                                        >
                                            Reset to default
                                        </button>
                                    )}
                                </div>
                            </Col>
                        )}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>
                    <Row className="settings-space">
                        <Col md={6}>
                            <ControlLabel
                                className={cn('setting-title', {
                                    'setting-title--strike': !validWithPlan
                                })}
                            >
                                Background Color:
                            </ControlLabel>
                            <p className="calendar-selection__description">The primary background color.</p>
                        </Col>
                        {validWithPlan && (
                            <Col md={6}>
                                <div>
                                    <ColourPicker
                                        formField={listViewBackgroundColor}
                                        handleSubmit={handleSubmit}
                                        inputOnChange={picker => {
                                            this.inputOnChange(
                                                picker && picker.hex,
                                                listViewBackgroundColor,
                                                handleSubmit
                                            );
                                        }}
                                        />
                                    {!this.valueIsDefault('listViewBackgroundColor') && (
                                        <button
                                            onClick={this.resetToDefault.bind(
                                                null,
                                                'listViewBackgroundColor'
                                            )}
                                            type="button"
                                            className="danger danger--small delete-color"
                                        >
                                            Reset to default
                                        </button>
                                    )}
                                </div>
                            </Col>
                        )}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>
                    <Row className="settings-space">
                        <Col md={6}>
                            <ControlLabel
                                className={cn('setting-title', {
                                    'setting-title--strike': !validWithPlan
                                })}
                            >
                                Secondary Background Color:
                            </ControlLabel>
                            <p className="calendar-selection__description">Used for effect in subtle places to benefit design.</p>
                        </Col>
                        {validWithPlan && (
                            <Col md={6}>
                                <div>
                                    <ColourPicker
                                        formField={secondaryBackgroundColor}
                                        handleSubmit={handleSubmit}
                                        inputOnChange={picker => {
                                            this.inputOnChange(
                                                picker && picker.hex,
                                                secondaryBackgroundColor,
                                                handleSubmit
                                            );
                                        }}
                                        />
                                    {!this.valueIsDefault('secondaryBackgroundColor') && (
                                        <button
                                            onClick={this.resetToDefault.bind(
                                                null,
                                                'secondaryBackgroundColor'
                                            )}
                                            type="button"
                                            className="danger danger--small delete-color"
                                        >
                                            Reset to default
                                        </button>
                                    )}
                                </div>
                            </Col>
                        )}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>
                    <Row className="settings-space">
                        <Col md={6}>
                            <ControlLabel
                                className={cn('setting-title', {
                                    'setting-title--strike': !validWithPlan
                                })}
                            >
                                Highlight Color:
                            </ControlLabel>
                            <p className="calendar-selection__description">Used for the important things like the subscribe button, and ticket links. Grab the users attention with this color.</p>
                        </Col>
                        {validWithPlan && (
                            <Col md={6}>
                                <div>
                                    <ColourPicker
                                        formField={highlightColor}
                                        handleSubmit={handleSubmit}
                                        inputOnChange={picker => {
                                            this.inputOnChange(
                                                picker && picker.hex,
                                                highlightColor,
                                                handleSubmit
                                            );
                                        }}
                                        />
                                    {!this.valueIsDefault('highlightColor') && (
                                        <button
                                            onClick={this.resetToDefault.bind(
                                                null,
                                                'highlightColor'
                                            )}
                                            type="button"
                                            className="danger danger--small delete-color"
                                        >
                                            Reset to default
                                        </button>
                                    )}
                                </div>
                            </Col>
                        )}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>
                    <Row className="settings-space">
                        <Col md={6}>
                            <ControlLabel
                                className={cn('setting-title', {
                                    'setting-title--strike': !validWithPlan
                                })}
                            >
                                Border Color:
                            </ControlLabel>
                            <p className="calendar-selection__description">The color of all borders excluding the grid view grid.</p>
                        </Col>
                        {validWithPlan && (
                            <Col md={6}>
                                <div>
                                    <ColourPicker
                                        formField={listViewBorderColor}
                                        handleSubmit={handleSubmit}
                                        inputOnChange={picker => {
                                            this.inputOnChange(
                                                picker && picker.hex,
                                                listViewBorderColor,
                                                handleSubmit
                                            );
                                        }}
                                        />
                                    {!this.valueIsDefault('listViewBorderColor') && (
                                        <button
                                            onClick={this.resetToDefault.bind(
                                                null,
                                                'listViewBorderColor'
                                            )}
                                            type="button"
                                            className="danger danger--small delete-color"
                                        >
                                            Reset to default
                                        </button>
                                    )}
                                </div>
                            </Col>
                        )}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>
                    <Row className="settings-space">
                        <Col md={6}>
                            <ControlLabel
                                className={cn('setting-title', {
                                    'setting-title--strike': !validWithPlan
                                })}
                            >
                                Text Color:
                            </ControlLabel>
                            <p className="calendar-selection__description">The primary text color.</p>
                        </Col>
                        {validWithPlan && (
                            <Col md={6}>
                                <div>
                                    <ColourPicker
                                        formField={listViewTextColor}
                                        handleSubmit={handleSubmit}
                                        inputOnChange={picker => {
                                            this.inputOnChange(
                                                picker && picker.hex,
                                                listViewTextColor,
                                                handleSubmit
                                            );
                                        }}
                                        />
                                    {!this.valueIsDefault('listViewTextColor') && (
                                        <button
                                            onClick={this.resetToDefault.bind(
                                                null,
                                                'listViewTextColor'
                                            )}
                                            type="button"
                                            className="danger danger--small delete-color"
                                        >
                                            Reset to default
                                        </button>
                                    )}
                                </div>
                            </Col>
                        )}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>
                    <Row className="settings-space settings-space--center settings-space--bottom-padding-0">
                        <Col md={6}>
                            <ControlLabel className="setting-title" className={cn('setting-title', {
                                'setting-title--strike': !validWithPlan
                            })}>
                                Font:
                            </ControlLabel>
                        </Col>
                        {validWithPlan && <Col md={6}>
                            <select {...font}
                                onChange={(e) => this.inputOnChange(e, font, handleSubmit)}
                                onBlur={(e) => this.inputOnChange(e, font, handleSubmit)}>
                                {fontList.map((itemName, index) => {
                                    return <option key={index}>{itemName}</option>
                                }) }
                            </select>
                        {!this.valueIsDefault('font') &&
                                <button
                                    onClick={this.resetToDefault.bind(
                                        null,
                                        'font'
                                    )}
                                    className="danger danger--small delete-color"
                                >
                                    Reset to default
                                </button>
                            }
                        </Col>}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>
                    <SettingsCategorySelection
                        options={[
                            { name: 'List view', emoji: '' },
                            { name: 'Grid view', emoji: '' }
                        ]}
                        settingClicked={this.settingClicked}
                    />
                {this.state.settingClicked === 'List view' && <Row className="settings-space settings-space--center settings-space--bottom-padding-0">
                        <Col md={6}>
                            <ControlLabel className="setting-title" className={cn('setting-title', {
                                'setting-title--strike': !validWithPlan
                            })}>
                                Event bottom spacing (px):
                            </ControlLabel>
                            <p className="calendar-selection__description">
                                <strong>The gap between each event.</strong>
                            </p>
                        </Col>
                        {validWithPlan && <Col md={6}>
                            <FormControl
                                type="number"
                                placeholder="5"
                                {...listViewEventBottomMargin}
                                onChange={e =>
                                    this.inputOnChange(e, listViewEventBottomMargin, handleSubmit)}
                                onBlur={e =>
                                    this.inputOnChange(e, listViewEventBottomMargin, handleSubmit)}
                            />
                        {!this.valueIsDefault('listViewEventBottomMargin') &&
                                <button
                                    onClick={this.resetToDefault.bind(
                                        null,
                                        'listViewEventBottomMargin'
                                    )}
                                    className="danger danger--small delete-color"
                                >
                                    Reset to default
                                </button>
                            }
                        </Col>}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>}
                    {this.state.settingClicked === 'Grid view' && <Row className="settings-space settings-space--center settings-space--bottom-padding-0">
                        <Col md={6}>
                            <ControlLabel className="setting-title" className={cn('setting-title', {
                                'setting-title--strike': !validWithPlan
                            })}>
                                Background:
                            </ControlLabel>
                            <p className="calendar-selection__description">
                                <strong>The grid view background.</strong>
                            </p>
                        </Col>
                        {validWithPlan && <Col md={6}>
                            <ColourPicker
                                formField={gridViewBackgroundColor}
                                handleSubmit={handleSubmit}
                                inputOnChange={picker => {
                                    this.inputOnChange(
                                        picker && picker.hex,
                                        gridViewBackgroundColor,
                                        handleSubmit
                                    );
                                }}
                                />
                            {!this.valueIsDefault('gridViewBackgroundColor') && (
                                    <button
                                        onClick={this.resetToDefault.bind(
                                            null,
                                            'gridViewBackgroundColor'
                                        )}
                                        className="danger danger--small delete-color"
                                    >
                                        Reset to default
                                    </button>
                                )}
                        </Col>}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>}
                    {this.state.settingClicked === 'Grid view' && <Row className="settings-space settings-space--center settings-space--bottom-padding-0">
                        <Col md={6}>
                            <ControlLabel className="setting-title" className={cn('setting-title', {
                                'setting-title--strike': !validWithPlan
                            })}>
                                Border:
                            </ControlLabel>
                            <p className="calendar-selection__description">
                                <strong>The grid view border.</strong>
                            </p>
                        </Col>
                        {validWithPlan && <Col md={6}>
                            <ColourPicker
                                formField={gridViewBorderColor}
                                handleSubmit={handleSubmit}
                                inputOnChange={picker => {
                                    this.inputOnChange(
                                        picker && picker.hex,
                                        gridViewBorderColor,
                                        handleSubmit
                                    );
                                }}
                                />
                            {!this.valueIsDefault('gridViewBorderColor') && (
                                    <button
                                        onClick={this.resetToDefault.bind(
                                            null,
                                            'gridViewBorderColor'
                                        )}
                                        className="danger danger--small delete-color"
                                    >
                                        Reset to default
                                    </button>
                                )}
                        </Col>}
                        {!validWithPlan && (
                            <LockedFeature columns={6} title={'Upgrade your account'} />
                        )}
                    </Row>}
                    <Row>
                        <Col md={12}>
                            <hr />
                        </Col>
                    </Row>
                </FormGroup>
            </form>
            </div>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'designForm', // a unique name for this form
        fields: [
            'listViewBackgroundColor',
            'listViewBorderColor',
            'listViewEventBottomMargin',
            'listViewTextColor',
            'canvasBackgroundColor',
            'gridViewBackgroundColor',
            'gridViewBorderColor',
            'secondaryBackgroundColor',
            'font',
            'highlightColor'
        ],
        overwriteOnInitialValuesChange: false
    },
    state => ({ initialValues: state.appState })
)(Component));
