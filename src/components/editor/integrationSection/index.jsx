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
                {bigcommerceUser && (
                    <div className="calendarCode__shopify">
                        <a
                            className="venobox"
                            data-autoplay="true"
                            data-vbtype="video"
                            href="https://www.youtube.com/watch?v=R6uKvhyHYVg"
                            >
                            BigCommerce integration guide
                        </a>
                    </div>
                )}
                {!weeblyUser && (
                    <CalendarCodeTextArea
                        eventCalWidgetUuid={eventCalWidgetUuid}
                        shopifyUser={shopifyUser}
                        userId={userId}
                        userSelectedScriptAdded={this.props.userSelectedScriptAdded}
                        highlight={this.props.highlightCodeArea}
                    />
                )}
            </div>
        );
    }
});
