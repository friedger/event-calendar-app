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
                        <button
                            title="Add another event"
                            onClick={() => {
                                this.props.exitAction();
                                this.props.addNewEventClicked();
                            }}
                            className="secondary secondary--inverse secondary--icon-only"
                        >
                            <i className="fas fa-calendar-plus"></i>
                        </button>
                        {this.props.deleteManualEvent && (
                            <button
                                onClick={() => this.props.deleteManualEvent()}
                                className="secondary secondary--inverse secondary--icon-only event-actions__delete"
                                title="Delete this event"
                            >
                                <i className="fas fa-trash-alt"></i>
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
