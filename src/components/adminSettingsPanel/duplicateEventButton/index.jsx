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
            }, 3000);
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
                className={cn('action', {
                    'animate-success': this.state.displaySuccessMessage,
                    'animate-error': this.state.displayErrorMessage
                })}
                disabled={(this.props.duplicatingEvent || this.state.displaySuccessMessage || this.state.displayErrorMessage)}
                onClick={() => this.props.duplicateManualEventAction()}
            >
                {!this.state.displaySuccessMessage && !this.state.displayErrorMessage && 'Duplicate event'}
                {this.state.displaySuccessMessage && <span><i className="fa fa-check" aria-hidden="true" /> Event Duplicated</span>}
                {this.state.displayErrorMessage && <span><i className="fa fa-ban" aria-hidden="true" /> Duplication failed</span>}
            </button>
        );
    }
});
