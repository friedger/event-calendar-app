require('./style.scss');
import React from 'react';
import cn from 'classnames';
import presets from './presets';
import UpgradeModal from '../../modals/upgradeModal';

export default React.createClass({
    getInitialState() {
        return {
            showUpgradeModal: false
        };
    },
    getColoursFromPreset(preset) {
        const colours = [];
        Object.keys(preset).forEach(presetKey => {
            if (presetKey.indexOf('Color') > -1 && presetKey.indexOf('canvas') === -1) {
                colours.push(preset[presetKey]);
            }
        });
        return colours;
    },
    render() {
        const { validWithPlan } = this.props;
        return (
            <div className={cn({ show: this.props.show }, 'design-presets row')}>
                <UpgradeModal
                    show={this.state.showUpgradeModal}
                    title={'Upgrade your account'}
                    hide={() => {
                        this.setState({ showUpgradeModal: false });
                    }}
                />
                {Object.keys(presets).map(presetName => {
                    return (
                        <div className="col-md-6">
                            <div
                                className="preset"
                                onClick={() => {
                                    if (!validWithPlan) {
                                        return this.setState({ showUpgradeModal: true });
                                    }
                                    this.props.onFormChange(presets[presetName]);
                                    Object.keys(this.props.fields).forEach(fieldName => {
                                        this.props.fields[fieldName].onChange(
                                            presets[presetName][fieldName]
                                        );
                                    });
                                    this.props.canvasBackgroundModified(
                                        presets[presetName].canvasBackgroundColor
                                    );
                                }}
                            >
                                <div className="preset__colours">
                                    {this.getColoursFromPreset(presets[presetName]).map((color, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className="preset__colour"
                                                style={{ background: color }}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="preset__content">
                                    {presetName}
                                    {validWithPlan && (
                                        <button className="action action--small" type="button">
                                            Apply
                                        </button>
                                    )}
                                    {!validWithPlan && <div
                                        className="preset__locked"
                                        onClick={() => this.setState({ showUpgradeModal: true })}
                                    >
                                        <i className="fa fa-lock" aria-hidden="true" />
                                    </div>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});
