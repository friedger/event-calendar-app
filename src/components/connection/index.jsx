require('./style.scss');
import React from 'react';
import Collapse from 'react-collapse';

export default React.createClass({
    getInitialState() {
        return {
            expanded: false
        };
    },
    render() {
        return (
            <div className="col-md-12">
                <div
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                    className="source"
                >
                    <span className="source__name">
                        {this.props.name}
                    </span>
                    <span className="number-connected">
                        {this.props.connections.length} Calendars Connected
                    </span>
                    <i
                        className={this.state.expanded ? 'fa fa-caret-down' : 'fa fa-caret-right'}
                        aria-hidden="true"
                    />
                    <Collapse isOpened={this.state.expanded}>
                        <ul>
                            {this.props.connections.map(connection => {
                                return (
                                    <li>
                                        ⚡️ {connection.name}{' '}
                                        {this.props.deleteCalendar && <span
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.props.deleteCalendar(connection);
                                            }}
                                            className="trash"
                                        >
                                            🗑
                                        </span>}
                                    </li>
                                );
                            })}
                        </ul>
                    </Collapse>
                </div>
            </div>
        );
    }
});
