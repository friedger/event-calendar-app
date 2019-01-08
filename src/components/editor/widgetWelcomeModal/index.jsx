require('./style.scss');
import React from 'react';
import { Modal } from 'react-bootstrap';
import PublicCalendarForm from '../../../containers/publicCalendarForm';

const stages = ['welcome', 'subdomain', 'introToEditor'];

export default React.createClass({
    getInitialState() {
        return {
            currentStage: stages[0]
        };
    },
    progressToNextStage() {
        const currentStage = this.state.currentStage;
        const currentStageIndex = stages.indexOf(currentStage);
        const nextStage = stages[currentStageIndex + 1];
        if (nextStage) {
            return this.setState({ currentStage: stages[currentStageIndex + 1] });
        }
        this.props.hide();
    },
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide} className="widget-welcome-modal">
                {this.state.currentStage === stages[0] && (
                    <div className="welcome-screen">
                        <img src="/images/onboarding/logo.png" />
                        <div className="welcome-screen__text">Welcome to your new Event Calendar</div>
                    </div>
                )}
                {this.state.currentStage === stages[1] && (
                    <div className="col-md-12 connection-modal">
                        <div>
                            <PublicCalendarForm />
                        </div>
                    </div>
                )}
                {this.state.currentStage === stages[2] && (
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            <div className="settings-space">
                                <div className="widget-welcome-modal__title">
                                    You are about the enter the Event Calendar Editor
                                </div>
                                <p className="widget-welcome-modal__content">
                                    This page, is the Event Calendar Editor and contains everything you need to
                                    configure your Events Calendar and add it to your website.
                                </p>
                                <p className="widget-welcome-modal__content">Here's a quick tour:</p>
                                <iframe
                                    src="https://player.vimeo.com/video/310125241"
                                    width="560"
                                    height="315"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                />{' '}
                            </div>
                        </div>
                    </div>
                )}
                {(this.state.currentStage === stages[0] || this.props.lastKnownSuccessfulAlias) && (
                    <div className="footer-button col-md-12" onClick={this.progressToNextStage}>
                        {this.state.currentStage === stages[2] ? 'Done' : 'Continue'}
                    </div>
                )}
            </Modal>
        );
    }
});

// <Modal.Header closeButton>
//     <Modal.Title>
//         <span>Welcome to your new Event Calendar 🤘</span>
//     </Modal.Title>
// </Modal.Header>

// <div className="col-md-12 connection-modal">
//     <div className="connection-modal__content">
//         {this.state.currentStage === stages[0] && (
//             <div>
//                 <p></p>
//             </div>
//         )}
//         {this.state.currentStage === stages[1] && <PublicCalendarForm />}
//     </div>
// </div>
