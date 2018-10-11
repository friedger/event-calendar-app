require('./style.scss');
import React from 'react';
import UpgradeModal from '../../modals/upgradeModal';

export default React.createClass({
    getInitialState() {
        return {
            showModal: false
        };
    },
    render() {
        const { columns, title } = this.props;
        if (!this.props.featureIsLocked) {
            return <div>{this.props.children}</div>;
        }
        return (
            <div className="locked-feature" md={columns} onClick={() => this.setState({ showModal: true })}>
                <UpgradeModal
                    show={this.state.showModal}
                    title={title || 'Please upgrade your account'}
                    hide={() => {
                        this.setState({ showModal: false });
                    }}
                />
            {this.props.children}
            </div>
        );
    }
});
