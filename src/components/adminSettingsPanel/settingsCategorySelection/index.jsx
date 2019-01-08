require('./style.scss');

import React from 'react';
import cn from 'classnames';

const SettingsCategorySelection = React.createClass({
    getInitialState() {
        return { activeSetting: this.props.defaultOption };
    },
    render() {
        return (
            <div className={'settings-space settings-navigation ' + this.props.className + ' ' + this.props.orientation + '-orientation'} style={{ border: 0, 'flex-direction': this.props.orientation }}>
                {this.props.options.map((option, index) => {
                    if (option.condition && !option.condition()) {
                        return null;
                    }
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                this.setState({ activeSetting: option.name });
                                this.props.settingClicked(option);
                            }}
                            className={cn('setting', {
                                'setting--active': this.state.activeSetting === option.name,
                                'setting--separate': option.separate,
                                'setting--reverse': option.reverse
                            })}
                            style={{ width: this.props.width }}
                        >
                            {this.props.showArrows && option.reverse && <i className="fa fa-angle-left" aria-hidden="true"></i>}
                            {option.emoji} {option.name}
                            {this.props.showArrows && !option.reverse && <i className="fa fa-angle-right" aria-hidden="true"></i>}
                        </div>
                    );
                })}
            </div>
        );
    }
});

SettingsCategorySelection.defaultProps = {
    width: '100%',
    showArrows: false,
    orientation: 'row'
};

export default SettingsCategorySelection;
