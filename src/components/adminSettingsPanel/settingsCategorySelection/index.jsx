require('./style.scss');

import React from 'react';
import { Row } from 'react-bootstrap';
import cn from 'classnames';

export default React.createClass({
    getInitialState() {
        return { activeSetting: this.props.options[0].name };
    },
    render() {
        return (
            <Row className="settings-space settings-navigation" style={{ border: 0 }}>
                <div className="col-md-12">
                    {this.props.options.map((option, index) => {
                        return (<div
                            key={index}
                            onClick={() => {
                                this.setState({ activeSetting: option.name })
                                this.props.settingClicked(option.name);
                            }}
                            className={cn('setting', {
                                'setting--active': this.state.activeSetting === option.name
                            })}
                            >
                            {option.emoji} {option.name}
                        </div>);
                    })}
                </div>
            </Row>
        );
    }
});
