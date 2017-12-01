require('./style.scss');
import React from 'react';
import { Modal } from 'react-bootstrap';
import featurePermissions from '../../../utils/featurePermissions';

export default React.createClass({
    getInitialState() {
        return { showThumbnailModal: false, showLocationModal: false };
    },
    componentDidMount() {
        document.addEventListener('ECA_suggestion-clicked', e => {
            switch (e.detail.name) {
            case 'thumbnail':
                this.setState({ showThumbnailModal: true });
                break;
            case 'location':
                this.setState({ showLocationModal: true });
                break;
            case 'buy-tickets':
                this.setState({ showTicketsModal: true });
                break;
            case 'event-details-image':
                this.setState({ showImageModal: true });
                break;
            case 'event-details':
                this.setState({ showDescriptionModal: true });
                break;
            case 'subscribe':
                this.setState({ showSubscriptionModal: true });
                break;
            default:

            }
        });
    },
    hideModal() {
        this.setState({ showThumbnailModal: false });
        this.setState({ showLocationModal: false });
        this.setState({ showTicketsModal: false });
        this.setState({ showImageModal: false });
        this.setState({ showDescriptionModal: false });
        this.setState({ showSubscriptionModal: false });
    },
    userHasInvaidPlan() {
        return this.props.status && !featurePermissions.checkFeatureAvailability(this.props.status, 'event-settings');
    },
    render() {
        return (
            <div>
                <Modal show={this.state.showThumbnailModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                Add a <strong>thumbnail</strong> to your event
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            {this.userHasInvaidPlan() && <div className="invalid-plan">Your plan does not support this feature.</div>}
                            <p className="highlight">
                                Adding thumbnails to your events is easy using our WYSIWYG editor.
                            </p>
                            <p>
                                Simply click on the event that you want to edit and use the settings panel on the right to configure your event.
                            </p>
                            <p>
                                For a more detailed explanation of configuring your events in Event
                                Calendar App, take a look at the video below.
                            </p>
                        </div>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/0zVeZlmRRTc"
                            frameborder="0"
                            allowFullScreen
                        />
                    </div>
                </Modal>
                <Modal show={this.state.showLocationModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                Add a <strong>location</strong> to your event
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            <p className="highlight">To add a location, simply add it via your calendar provider.</p>
                            <p>
                                For example, when adding an event to your google calendar, there is
                                also an option to add a location. Simply fill in this field and it
                                will automatically populate in Event Calendar App.
                            </p>
                            <p>Exact steps may vary depending on what service you use.</p>
                        </div>
                    </div>
                </Modal>
                <Modal show={this.state.showTicketsModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                Add a <strong>tickets link</strong> to your event
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            {this.userHasInvaidPlan() && <div className="invalid-plan">Your plan does not support this feature.</div>}
                            <p className="highlight">
                                Adding ticket links to your events is easy using our WYSIWYG editor.
                            </p>
                            <p>
                                Simply click on the event that you want to edit and use the settings panel on the right to configure your event.
                            </p>
                            <p>
                                For a more detailed explanation of configuring your events in Event
                                Calendar App, take a look at the video below.
                            </p>
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/0zVeZlmRRTc"
                                frameborder="0"
                                allowFullScreen
                            />{' '}
                        </div>
                    </div>
                </Modal>
                <Modal show={this.state.showImageModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                Add a <strong>image</strong> to your event
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            {this.userHasInvaidPlan() && <div className="invalid-plan">Your plan does not support this feature.</div>}
                            <p className="highlight">
                                Adding images to your events is easy using our WYSIWYG editor.
                            </p>
                            <p>
                                Simply click on the event that you want to edit and use the settings panel on the right to configure your event.
                            </p>
                            <p>
                                For a more detailed explanation of configuring your events in Event
                                Calendar App, take a look at the video below.
                            </p>
                        </div>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/0zVeZlmRRTc"
                            frameborder="0"
                            allowFullScreen
                        />{' '}
                    </div>
                </Modal>
                <Modal show={this.state.showDescriptionModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                Add a <strong>description</strong> to your event
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            <p>To add a description, simply add it via your calendar provider.</p>
                            <p>
                                For example, when adding an event to your google calendar, there is
                                also an option to add a event description. Simply fill in this field
                                and it will automatically populate in Event Calendar App.
                            </p>
                            <p>Exact steps may vary depending on what service you use.</p>
                        </div>
                    </div>
                </Modal>
                <Modal show={this.state.showSubscriptionModal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>
                                Let your customers <strong>subscribe</strong> to your events
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            {this.userHasInvaidPlan() && <div className="invalid-plan">Your plan does not support this feature.</div>}
                            <p>
                                We highly recommend letting your customers subscribe to your events.{' '}
                                <strong>
                                    When you update your Event Calendar, their calendar updates too!
                                </strong>
                            </p>
                            <p>
                                To add the subscription button, simply turn the option on from your
                                Event Calendar App dashboard.
                            </p>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
});
