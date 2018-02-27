require('./style.scss');

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { ChromePicker } from 'react-color';

export default React.createClass({
    getInitialState() {
        return {
            showPicker: false
        };
    },
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    },
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
    handleClickOutside(event) {
        if (this.refs && !this.refs['color-container'].contains(event.target)) {
            this.setState({showPicker: false});
        }
    },
    render() {
        const { formField, handleSubmit, inputOnChange } = this.props;
        return (
            <div className="color-container" ref="color-container">
                <div className="color-container__preview" style={{background: formField.value}}></div>
                <FormControl
                    type="text"
                    {...formField}
                    onChange={e => {}}
                    onClick={() => {
                        this.setState({ showPicker: true });
                    }}
                />
                {this.state.showPicker && (
                    <ChromePicker
                        color={formField.value === null ? false : formField.value}
                        onChange={inputOnChange}
                    />
                )}
            </div>
        );
    }
});
