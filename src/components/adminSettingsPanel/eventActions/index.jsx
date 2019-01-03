require('./style.scss');
import React from 'react';
import DuplicateEventButton from '../duplicateEventButton';

export default React.createClass({
    render() {
        return (
            <footer className="row event-actions">
                <div className="col-md-12">
                    <div className="event-actions__actions">
                        <button
                            className="action"
                            onClick={() => this.props.exitAction()}
                        >
                            Done
                        </button>
                        {this.props.displayDuplicationButton && <DuplicateEventButton
                            duplicatingEvent={this.props.duplicatingEvent}
                            duplicateManualEventAction={
                                this.props.duplicateManualEventAction
                            }
                            eventDuplicationSuccess={this.props.eventDuplicationSuccess}
                            eventDuplicationError={this.props.eventDuplicationError}
                        />}
                        {this.props.deleteManualEvent && (
                            <button
                                onClick={() => this.props.deleteManualEvent()}
                                className="secondary secondary--inverse event-actions__delete"
                                title="Delete this event"
                            >
                                🗑 Delete event
                            </button>
                        )}
                    </div>
                </div>
            </footer>
        );
    }
});

// <button className="action" disabled={this.props.duplicatingEvent} onClick={() => this.props.duplicateManualEventAction()}>
//   Duplicate event
// </button>
