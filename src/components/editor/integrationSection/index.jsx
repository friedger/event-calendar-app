import React from 'react';
import BackToWeeblyMessage from '../backToWeeblyMessage';
import CalendarCodeTextArea from '../calendarCodeTextArea';

export default React.createClass({
    componentDidMount() {
        $('.venobox').venobox();
    },
    render() {
        const { weeblyUser, bigcommerceUser, shopifyUser, eventCalWidgetUuid, userId } = this.props;
        return (
            <div>
                <hr />
                {weeblyUser && (
                    <BackToWeeblyMessage></BackToWeeblyMessage>
                )}
                {!weeblyUser && (
                    <CalendarCodeTextArea
                        eventCalWidgetUuid={eventCalWidgetUuid}
                        shopifyUser={shopifyUser}
                        bigcommerceUser={bigcommerceUser}
                        userId={userId}
                        userSelectedScriptAdded={this.props.userSelectedScriptAdded}
                        highlight={this.props.highlightCodeArea}
                    />
                )}
            </div>
        );
    }
});
