require('./style.scss');
import React from 'react';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import NewPostForm from '../newPostForm';
import EventSettingsForAllEvents from '../eventSettingsForAllEvents';
import SettingsCategorySelection from '../settingsCategorySelection';
import SidePanelWrapper from '../sidePanelWrapper';

export default React.createClass({
    getInitialState() {
        return {
            displayNewPostForm: this.props.manualEventSelected,
            displaySettingsForAllEvents: !this.props.manualEventSelected
        };
    },
    componentWillMount() {
        this.makeApiCall = debounce(values => {
            this.props.putEventAction(values);
        }, 1000);
    },
    manualEventSettingsUpdated(handleSubmit, manualEventSettings) {
        setTimeout(() => {
            handleSubmit(values => this.makeApiCall(Object.assign(manualEventSettings, values)))();
        }, 0);
    },
    settingClicked(settingName) {
        if (settingName === 'Content & time') {
            return this.setState({ displayNewPostForm: true, displaySettingsForAllEvents: false });
        }
        if (settingName === 'Appearance') {
            return this.setState({ displayNewPostForm: false, displaySettingsForAllEvents: true });
        }
    },
    render() {
        const { handleSubmit, demoEvent, manualEventSelected, deleteManualEvent } = this.props;
        if (demoEvent) {
            return (
                <div className={cn('event-settings show')}>
                    <div className="demo-event-message">
                        <p>This is an event from our demo calendar and cannot be edited.</p>{' '}
                        <p>Choose one of your own events.</p>
                    </div>
                </div>
            );
        }
        return (
            <SidePanelWrapper enableActionBar={true}>
                <div className={cn('event-settings show')}>
                    {manualEventSelected && <SettingsCategorySelection
                        options={[
                            { name: 'Content & time', emoji: '📝' },
                            { name: 'Appearance', emoji: '😍' }
                        ]}
                        settingClicked={this.settingClicked}
                    />}
                    {manualEventSelected && (
                        <NewPostForm
                            ref="newPostForm"
                            show={this.state.displayNewPostForm}
                            putToApiOnChange={true}
                            putEventAction={this.props.putEventAction}
                        />
                    )}
                    <div className="row settings-form">
                        <div className="col-md-12">
                            <EventSettingsForAllEvents
                                show={this.state.displaySettingsForAllEvents}
                                validWithPlan={this.props.validWithPlan}
                                putEventAction={this.props.putEventAction}
                                demoEvent={this.props.demoEvent}
                                exitAction={this.props.exitAction}
                            />
                        </div>
                    </div>
                </div>
            </SidePanelWrapper>
        );
    }
});
