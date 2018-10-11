require('./style.scss');
import React from 'react';
import cn from 'classnames';
import { Row, Col, FormGroup } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import debounce from 'lodash.debounce';
import SettingsCategorySelection from '../settingsCategorySelection';
import defaultDesignSettings from './defaults';
import DesignPresets from '../designPresets';
import ColourPickerField from '../colourPickerField';
import DropdownField from '../dropdownField';
import NumericalField from '../numericalField';

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
        return {
            settingClicked: 'List view',
            designPageToDisplay: 'Presets'
        };
    },
    settingClicked(setting) {
        this.setState({ settingClicked: setting });
    },
    desginSettingClicked(setting) {
        this.setState({ designPageToDisplay: setting });
    },
    componentWillMount() {
        this.makeApiCall = debounce(values => {
            this.props.onFormChange(values);
        }, 1000);
    },
    inputOnChange(e, field, handleSubmit) {
        field.onChange(e);
        // Settimeout ensures we include the latest value
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(values))();
        }, 0);
    },
    resetToDefault(fieldName, e) {
        e.preventDefault();
        const onChangeObj = {};
        onChangeObj[fieldName] = defaultDesignSettings[fieldName];
        this.props.onFormChange(onChangeObj);
        this.props.fields[fieldName].onChange(defaultDesignSettings[fieldName]);

        if (fieldName === 'canvasBackgroundColor') {
            return this.props.canvasBackgroundModified('#fff');
        }
    },
    valueIsDefault(fieldName) {
        return (
            this.props.fields[fieldName].value ===
            defaultDesignSettings[fieldName]
        );
    },
    colourPickerInputChange(field, picker) {
        this.inputOnChange(
            picker && picker.hex,
            field,
            this.props.handleSubmit
        );
    },
    render() {
        const {
            validWithPlan,
            fields: {
                listViewBackgroundColor,
                listViewBorderColor,
                listViewEventBottomMargin,
                listViewTextColor,
                secondaryTextColor,
                canvasBackgroundColor,
                gridViewBackgroundColor,
                gridViewBorderColor,
                secondaryBackgroundColor,
                font,
                highlightColor
            },
            handleSubmit
        } = this.props;

        const propsForAllColourPickerInputs = {
            validWithPlan: validWithPlan,
            handleSubmit: handleSubmit,
            resetToDefault: this.resetToDefault
        };
        return (
            <div>
                {this.props.show && (
                    <SettingsCategorySelection
                        options={[
                            { name: 'Presets', emoji: '' },
                            { name: 'Customise', emoji: '' }
                        ]}
                        settingClicked={this.desginSettingClicked}
                    />
                )}
                <DesignPresets
                    show={
                        this.props.show &&
                        this.state.designPageToDisplay === 'Presets'
                    }
                    validWithPlan={validWithPlan}
                    fields={this.props.fields}
                    onFormChange={this.props.onFormChange}
                    canvasBackgroundModified={
                        this.props.canvasBackgroundModified
                    }
                />
                <form
                    ref="settingsForm"
                    className="design-form"
                    className={cn('form-horizontal', 'design-form', {
                        show:
                            this.props.show &&
                            this.state.designPageToDisplay === 'Customise'
                    })}
                    onSubmit={() => {}}
                >
                    <FormGroup>
                        <ColourPickerField
                            {...propsForAllColourPickerInputs}
                            field={canvasBackgroundColor}
                            valueIsDefault={this.valueIsDefault(
                                'canvasBackgroundColor'
                            )}
                            title={'Canvas background color:'}
                            inputOnChange={picker => {
                                this.props.canvasBackgroundModified(picker.hex);
                                this.colourPickerInputChange(
                                    canvasBackgroundColor,
                                    picker
                                );
                            }}
                            description={
                                'This will have no effect on your website. However, it lets you design your Event Calendar with the same background as is on your website.'
                            }
                        />
                        <ColourPickerField
                            {...propsForAllColourPickerInputs}
                            field={listViewBackgroundColor}
                            valueIsDefault={this.valueIsDefault(
                                'listViewBackgroundColor'
                            )}
                            title={'Background Color:'}
                            inputOnChange={this.colourPickerInputChange.bind(
                                null,
                                listViewBackgroundColor
                            )}
                            description={'The primary background color.'}
                        />
                        <ColourPickerField
                            {...propsForAllColourPickerInputs}
                            field={secondaryBackgroundColor}
                            valueIsDefault={this.valueIsDefault(
                                'secondaryBackgroundColor'
                            )}
                            title={'Secondary Background Color:'}
                            inputOnChange={this.colourPickerInputChange.bind(
                                null,
                                secondaryBackgroundColor
                            )}
                            description={
                                'Used for effect in subtle places to benefit design.'
                            }
                        />
                        <ColourPickerField
                            field={highlightColor}
                            {...propsForAllColourPickerInputs}
                            valueIsDefault={this.valueIsDefault(
                                'highlightColor'
                            )}
                            title={'Highlight Color:'}
                            inputOnChange={this.colourPickerInputChange.bind(
                                null,
                                highlightColor
                            )}
                            description={
                                'Used for the important things like the subscribe button, and ticket links. Grab the users attention with this color.'
                            }
                        />
                        <ColourPickerField
                            {...propsForAllColourPickerInputs}
                            field={listViewBorderColor}
                            valueIsDefault={this.valueIsDefault(
                                'listViewBorderColor'
                            )}
                            title={'Border Color:'}
                            inputOnChange={this.colourPickerInputChange.bind(
                                null,
                                listViewBorderColor
                            )}
                            description={
                                'The color of all borders excluding the grid view grid.'
                            }
                        />
                        <ColourPickerField
                            {...propsForAllColourPickerInputs}
                            field={listViewTextColor}
                            valueIsDefault={this.valueIsDefault(
                                'listViewTextColor'
                            )}
                            title={'Text Color:'}
                            inputOnChange={this.colourPickerInputChange.bind(
                                null,
                                listViewTextColor
                            )}
                            description={'The primary text color.'}
                        />
                        <ColourPickerField
                            {...propsForAllColourPickerInputs}
                            field={secondaryTextColor}
                            valueIsDefault={this.valueIsDefault(
                                'secondaryTextColor'
                            )}
                            title={'Secondary Text Color:'}
                            inputOnChange={this.colourPickerInputChange.bind(
                                null,
                                secondaryTextColor
                            )}
                            description={'The secondary text color.'}
                        />
                        <DropdownField
                            className="settings-space--bottom-padding-0"
                            {...propsForAllColourPickerInputs}
                            onChange={e =>
                                this.inputOnChange(e, font, handleSubmit)
                            }
                            field={font}
                            valueIsDefault={this.valueIsDefault('font')}
                        >
                            {fontList.map((itemName, index) => {
                                return <option key={index}>{itemName}</option>;
                            })}
                        </DropdownField>
                        <SettingsCategorySelection
                            options={[
                                { name: 'List view', emoji: '' },
                                { name: 'Grid view', emoji: '' }
                            ]}
                            settingClicked={this.settingClicked}
                        />
                        {this.state.settingClicked === 'List view' && (
                            <NumericalField
                                {...propsForAllColourPickerInputs}
                                field={listViewEventBottomMargin}
                                onChange={e =>
                                    this.inputOnChange(
                                        e,
                                        listViewEventBottomMargin,
                                        handleSubmit
                                    )
                                }
                                onBlur={e =>
                                    this.inputOnChange(
                                        e,
                                        listViewEventBottomMargin,
                                        handleSubmit
                                    )
                                }
                                valueIsDefault={this.valueIsDefault(
                                    'listViewEventBottomMargin'
                                )}
                            />
                        )}
                        {this.state.settingClicked === 'Grid view' && (
                            <ColourPickerField
                                className={
                                    'settings-space--bottom-padding-0'
                                }
                                {...propsForAllColourPickerInputs}
                                field={gridViewBackgroundColor}
                                valueIsDefault={this.valueIsDefault(
                                    'gridViewBackgroundColor'
                                )}
                                title={'Background:'}
                                inputOnChange={this.colourPickerInputChange.bind(
                                    null,
                                    gridViewBackgroundColor
                                )}
                                description={'The grid view background.'}
                            />
                        )}
                        {this.state.settingClicked === 'Grid view' && (
                            <ColourPickerField
                                {...propsForAllColourPickerInputs}
                                className={
                                    'settings-space--bottom-padding-0'
                                }
                                field={gridViewBorderColor}
                                valueIsDefault={this.valueIsDefault(
                                    'gridViewBorderColor'
                                )}
                                title={'Border:'}
                                inputOnChange={this.colourPickerInputChange.bind(
                                    null,
                                    gridViewBorderColor
                                )}
                                description={'The grid view border.'}
                            />
                        )}
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
            'secondaryTextColor',
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
