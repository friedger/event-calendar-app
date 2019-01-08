import React from 'react';
import './style.scss';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { reduxForm } from 'redux-form';

var SubdomainInput = React.createClass({
    componentDidMount() {
        this.makeApiCall = debounce((alias, uuid) => this.props.putWidgetAlias(alias, uuid), 500);
    },
    inputOnChange(e) {
        this.props.fields.alias.onChange(e);
        this.makeApiCall(e.target.value, this.props.eventCalWidgetUuid);
    },
    render() {
        const {
            aliasSuccess,
            aliasFail,
            aliasInvalid,
            fields: { alias },
            lastKnownSuccessfulAlias,
            displayDirectUrl
        } = this.props;
        return (
            <div>
                {lastKnownSuccessfulAlias && displayDirectUrl && (
                    <div className="settings-space url-to-public-calendar">
                        <p className="subtitle">Direct URL</p>
                        <p style={{'margin-bottom': '4px'}}>You can access a public version of your Event Calendar by going to:</p>
                        <a
                            className="url-to-public-calendar__public-url"
                            target="_blank"
                            href={`https://${lastKnownSuccessfulAlias}.eventcalendarapp.com`}
                        >{`${lastKnownSuccessfulAlias}.eventcalendarapp.com`}</a>
                    </div>
                )}
                <div className={cn({ 'setting-title': this.props.viewmode !== 'adminpanel' })}>
                    <label
                        className={cn('setting-title', { 'setting-title--sub': this.props.viewmode === 'adminpanel' })}
                    >
                        {this.props.viewmode === 'adminpanel' ? 'Change name' : 'Choose a name for your Event Calendar'}
                    </label>
                    <p className="setting-sub-title">
                        The name must contain only letters, numbers and <strong>no spaces</strong>.
                    </p>
                    <div className="subdomain-input" style={{ 'flex-direction': this.props.subdomainFlexDirection }}>
                        <input
                            {...alias}
                            placeholder="Choose a name"
                            name=""
                            onChange={this.inputOnChange}
                            type="text"
                            className="form-control subdomain-input__subdomain"
                        />
                        <div
                            className={cn('subdomain-input__domain', {
                                'subdomain-input__domain--success': aliasSuccess,
                                'subdomain-input__domain--name-not-available': aliasFail || aliasInvalid
                            })}
                        >
                            {aliasSuccess && (
                                <div>
                                    <i className="fa fa-check" aria-hidden="true" /> Name is available
                                </div>
                            )}
                            {aliasFail && (
                                <div>
                                    <i className="fa fa-ban" aria-hidden="true" /> Name is not available
                                </div>
                            )}
                            {aliasInvalid && (
                                <div>
                                    <i className="fa fa-ban" aria-hidden="true" /> Invalid Name
                                </div>
                            )}
                            {!aliasSuccess && !aliasFail && !aliasInvalid && <div>.eventcalendarapp.com</div>}
                        </div>
                    </div>
                    {aliasInvalid && (
                        <p className="calendar-selection__description">
                            Here's some valid examples: <strong>eventcalendarapp</strong>,{' '}
                            <strong>yourcompanyname</strong> or <strong>sallyscoffee</strong>.
                        </p>
                    )}
                    <p className="setting-sub-title setting-sub-title--more-info">
                        <a
                            target="_blank"
                            href="https://support.eventcalendarapp.com/faqs-and-troubleshooting/information-regarding-choosing-a-name-for-your-event-calendar"
                        >
                            More info on this step
                        </a>
                    </p>
                </div>
            </div>
        );
    }
});

SubdomainInput.defaultProps = {
    subdomainFlexDirection: 'row'
};

export default (SubdomainInput = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'publicCalendarForm2', // a unique name for this form
        fields: ['alias'],
        overwriteOnInitialValuesChange: true
    },
    state => {
        return { initialValues: state.widgetState.widget };
    }
)(SubdomainInput));
