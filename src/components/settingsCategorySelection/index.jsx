require('./style.scss');

import React from 'react';
import { Row } from 'react-bootstrap';
import cn from 'classnames';

export default React.createClass({
    getInitialState() {
        return { activeSetting: 'sources' };
    },
    render() {
        return (
            <Row className="settings-space settings-navigation" style={{ border: 0 }}>
                <div className="col-md-12">
                    <div
                        onClick={() => {
                            this.setState({ activeSetting: 'sources' })
                            this.props.settingClicked('sources');
                        }}
                        className={cn('setting', {
                            'setting--active': this.state.activeSetting === 'sources'
                        })}
                    >
                        Event Sources
                    </div>
                    <div
                        className={cn('setting', {
                            'setting--active': this.state.activeSetting === 'layout'
                        })}
                        onClick={() => {
                            this.setState({ activeSetting: 'layout' })
                            this.props.settingClicked('layout');
                        }}
                    >
                        Layout
                    </div>
                </div>
            </Row>
        );
    }
});
