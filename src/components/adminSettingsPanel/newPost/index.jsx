require('./style.scss');
import React from 'react';
import NewPostForm from '../newPostForm';
import AddEventSubmitButtons from '../addEventSubmitButtons';
import cn from 'classnames';
import SidePanelWrapper from '../sidePanelWrapper';

export default React.createClass({
    getInitialState() {
        return {
            additionalNegativeHeight: '- 33px'
        };
    },
    submit(values) {
        this.props.postManualEvent(values);
    },
    addEventClicked() {
        this.refs.newPostForm.submit();
    },
    render() {
        const { postedEvent, postingEvent, displayAddEventTip } = this.props.manualEventState;
        return (
            <div className="new-post-container">
                <SidePanelWrapper enableActionBar={true} additionalNegativeHeight={this.state.additionalNegativeHeight}>
                    <div className="row">
                        <div className="col-md-12" style={{ height: 'calc(100vh - 133px)' }}>
                            {displayAddEventTip && <div className="newPost__tip">
                                🚧 Get started by adding your first event. Don't worry, you can edit it later if you choose.
                            </div>}
                            <NewPostForm
                                ref="newPostForm"
                                inputChange={() => {}}
                                show={true}
                                disableInputs={postedEvent}
                                initialValues={{ start: 'hey' }}
                                displayAdditionalOptionsMessage={false}
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
                    onButtonTypeSwitch={() => this.setState({ additionalNegativeHeight: '' })}
                />
            </div>
        );
    }
});
