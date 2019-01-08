require('./style.scss');
import React from 'react';
import NewPostForm from '../newPostForm';
import AddEventSubmitButtons from '../addEventSubmitButtons';
import SidePanelWrapper from '../sidePanelWrapper';

export default React.createClass({
    getInitialState() {
        return {
            additionalNegativeHeight: '- 33px',
            validationError: false
        };
    },
    submit(values) {
        this.props.postManualEvent(values, this.props.eventCalWidgetUuid, () => {
            setTimeout(() => {
                this.props.editEventClicked();
            }, 2000);
        });
    },
    submitFail() {
        this.setState({ validationError: true });
        this.refs.sidePanelWrapper.scrollToTop();
    },
    addEventClicked() {
        this.refs.newPostForm.submit();
    },
    render() {
        const { postedEvent, postingEvent, displayAddEventTip } = this.props.manualEventState;

        return (
            <div className="new-post-container" ref="newPostContainer">
                <SidePanelWrapper
                    ref="sidePanelWrapper"
                    enableActionBar={true}
                    additionalNegativeHeight={this.state.additionalNegativeHeight}
                >
                    <div className="row">
                        <div className="col-md-12">
                            {displayAddEventTip && (
                                <div className="newPost__tip">
                                    🚧 Get started by adding your first event. Dont worry, you can
                                    edit it later if you choose.
                                </div>
                            )}
                            <NewPostForm
                                ref="newPostForm"
                                inputChanged={() => {
                                    if (this.state.validationError) {
                                        this.setState({ validationError: false });
                                    }
                                }}
                                show={true}
                                disableInputs={postedEvent}
                                initialValues={{ start: 'hey' }}
                                displayAdditionalOptionsMessage={false}
                                onSubmitFail={() => {
                                    this.submitFail();
                                }}
                                onSubmit={values => {
                                    this.submit(values);
                                }}
                            />
                        </div>
                    </div>
                </SidePanelWrapper>
                <AddEventSubmitButtons
                    addEventClicked={this.addEventClicked}
                    postedEvent={postedEvent}
                    postingEvent={postingEvent}
                    addNewEventClicked={this.props.addNewEventClicked}
                    editEventClicked={this.props.editEventClicked}
                    close={this.props.close}
                    validationError={this.state.validationError}
                    onButtonTypeSwitch={() => this.setState({ additionalNegativeHeight: '' })}
                />
            </div>
        );
    }
});
