require('./style.scss');
import React from 'react';

export default React.createClass({
    render() {
        return (
            <footer className="row event-actions">
                <div className="col-md-12">
                    <div className="event-actions__actions">
                        <button className="action" onClick={() => this.props.exitAction()}>
                            Finish editing event
                        </button>
                        {this.props.deleteManualEvent &&
                        <button
                            onClick={() => this.props.deleteManualEvent()}
                            className="secondary secondary--inverse event-actions__delete"
                            title="Delete this event"
                        >
                            🗑 Delete event
                        </button>}
                    </div>
                </div>
            </footer>
        );
    }
});
