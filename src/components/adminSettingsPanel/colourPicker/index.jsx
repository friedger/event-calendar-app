require('./style.scss');

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { ChromePicker } from 'react-color';
import listensToClickOutside from 'react-onclickoutside/decorator';

const ChromePickerComponent = listensToClickOutside(
    React.createClass({
        handleClickOutside(event) {
            this.props.onOutsideClick();
        },
        render() {
            return (
                <ChromePicker
                    color={this.props.color}
                    onChange={this.props.onChange}
                    disableAlpha={true}
                />
            );
        }
    })
);

export default React.createClass({
    getInitialState() {
        return {
            showPicker: false
        };
    },
    handleClickOutside(event) {
        this.setState({ showPicker: false });
    },
    render() {
        const { formField, handleSubmit, inputOnChange } = this.props;
        return (
            <div className="color-container" ref="color-container">
                <div
                    className="color-container__preview"
                    style={{ background: formField.value }}
                />
            <FormControl
                    className={this.props.ignoreClassForReactClickOutside}
                    type="text"
                    autoComplete="off"
                    readOnly="readonly"
                    {...formField}
                    onChange={e => {}}
                    onClick={() => {
                        this.setState({ showPicker: !this.state.showPicker });
                    }}
                />
                {this.state.showPicker && (
                    <ChromePickerComponent
                        color={
                            formField.value === null ? false : formField.value
                        }
                        onChange={inputOnChange}
                        onOutsideClick={this.handleClickOutside}
                        outsideClickIgnoreClass={this.props.ignoreClassForReactClickOutside}
                    />
                )}
            </div>
        );
    }
});
