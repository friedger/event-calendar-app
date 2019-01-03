require('./style.scss');

import React from 'react';
import { Row } from 'react-bootstrap';
import cn from 'classnames';

const SettingsCategorySelection = React.createClass({
    getInitialState() {
        return { activeSetting: this.props.defaultOption };
    },
    render() {
        return (
            <Row className={'settings-space settings-navigation ' + this.props.className} style={{ border: 0 }}>
                {this.props.options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                this.setState({ activeSetting: option.name });
                                this.props.settingClicked(option);
                            }}
                            className={cn('setting col-md-12', {
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
            </Row>
        );
    }
});

SettingsCategorySelection.defaultProps = {
    width: '100%',
    showArrows: false
};

export default SettingsCategorySelection;
