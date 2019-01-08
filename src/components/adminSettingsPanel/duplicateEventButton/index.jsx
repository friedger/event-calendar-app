import React from 'react';
import cn from 'classnames';

export default React.createClass({
    getInitialState() {
        return { displaySuccessMessage: false };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.eventDuplicationSuccess && this.props.duplicatingEvent) {
            this.setState({ displaySuccessMessage: true });
            setTimeout(() => {
                this.setState({ displaySuccessMessage: false });
            }, 1500);
        }
        if (nextProps.eventDuplicationError && this.props.duplicatingEvent) {
            this.setState({ displayErrorMessage: true });
            setTimeout(() => {
                this.setState({ displayErrorMessage: false });
            }, 3000);
        }
    },
    render() {
        return (
            <button
                title="Duplicate Event"
                className={cn('secondary secondary--inverse secondary--icon-only', {
                    'animate-success': this.state.displaySuccessMessage,
                    'animate-error': this.state.displayErrorMessage
                })}
                disabled={
                    this.props.duplicatingEvent || this.state.displaySuccessMessage || this.state.displayErrorMessage
                }
                onClick={() => this.props.duplicateManualEventAction()}
            >
                <i className="far fa-clone" />
                {this.state.displaySuccessMessage && (
                    <span style={{ 'font-size': '14px', 'padding-left': '18px', position: 'absolute', right: '20px' }}>
                        Event Duplicated
                    </span>
                )}
                {this.state.displayErrorMessage && (
                    <span style={{ 'font-size': '14px', 'padding-left': '18px', position: 'absolute', right: '20px' }}>
                        <i className="fa fa-ban" aria-hidden="true" /> Duplication failed
                    </span>
                )}
            </button>
        );
    }
});
