require('./style.scss');
import React from 'react';
import NewPostForm from '../newPostForm';
import { Row, Col } from 'react-bootstrap';
import AddEventSubmitButtons from '../addEventSubmitButtons';

export default React.createClass({
    submit(values) {
        this.props.postManualEvent(values);
    },
    addEventClicked() {
        this.refs.newPostForm.submit();
    },
    render() {
        const { postedEvent, postingEvent } = this.props.manualEventState;
        return (
            <div className="row">
                <div
                    className="col-md-12"
                    style={{ overflow: 'scroll', height: 'calc(100vh - 130px)' }}
                >
                <AddEventSubmitButtons
                    addEventClicked={this.addEventClicked}
                    postedEvent={postedEvent}
                    postingEvent={postingEvent}
                    addNewEventClicked={this.props.addNewEventClicked}
                    editEventClicked={this.props.editEventClicked}
                    close={this.props.close}
                ></AddEventSubmitButtons>
                    <NewPostForm
                        ref="newPostForm"
                        inputChange={() => {}}
                        disableInputs={postedEvent}
                        initialValues={{ start: 'hey' }}
                        onSubmit={values => {
                            this.submit(values);
                        }}
                    />

                <AddEventSubmitButtons
                    addEventClicked={this.addEventClicked}
                    postedEvent={postedEvent}
                    postingEvent={postingEvent}
                    addNewEventClicked={this.props.addNewEventClicked}
                    editEventClicked={this.props.editEventClicked}
                    close={this.props.close}
                ></AddEventSubmitButtons>
                </div>
            </div>
        );
    }
});
