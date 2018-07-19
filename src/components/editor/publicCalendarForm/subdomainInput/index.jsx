import React from 'react';
import './style.scss';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { reduxForm } from 'redux-form';

var Component = React.createClass({
    componentDidMount() {
        this.makeApiCall = debounce(
            (alias, uuid) => this.props.putWidgetAlias(alias, uuid),
            500
        );
    },
    inputOnChange(e) {
        this.props.fields.alias.onChange(e);
        this.makeApiCall(e.target.value, this.props.eventCalWidgetUuid);
    },
    render() {
        const { aliasSuccess, aliasFail, aliasInvalid, fields: { alias }, lastKnownSuccessfulAlias } = this.props;
        return (
            <div>
                <div className="settings-space">
                    <p className="subtitle">Url</p>
                    <p>
                        A name to use in the address bar when people see your
                        public Event Calendar. Lowercase numbers and letters only.
                    </p>
                    <div className="subdomain-input">
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
                                    <i
                                        className="fa fa-check"
                                        aria-hidden="true"
                                    />{' '}
                                    Name is available
                                </div>
                            )}
                            {aliasFail && (
                                <div>
                                    <i
                                        className="fa fa-ban"
                                        aria-hidden="true"
                                    />{' '}
                                    Name is not available
                                </div>
                            )}
                            {aliasInvalid && (
                                <div>
                                    <i
                                        className="fa fa-ban"
                                        aria-hidden="true"
                                    />{' '}
                                    Invalid URL
                                </div>
                            )}
                            {!aliasSuccess &&
                                !aliasFail && !aliasInvalid && <div>.eventcalendarapp.com</div>}
                        </div>
                    </div>
                </div>
                {lastKnownSuccessfulAlias &&
                <div className="settings-space url-to-public-calendar">
                    <p className="subtitle">Direct URL</p>
                    <p>
                        You can access a public version of your Event Calendar
                        by going to:
                    </p>
                    <a className="url-to-public-calendar__public-url" href={`http://${lastKnownSuccessfulAlias}.eventcalendarapp.com`}>{`${lastKnownSuccessfulAlias}.eventcalendarapp.com`}</a>
                </div>
                }
            </div>
        );
    }
});

export default (Component = reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'publicCalendarForm2', // a unique name for this form
        fields: ['alias'],
        overwriteOnInitialValuesChange: true
    },
    state => {
        return { initialValues: state.widgetState.widget };
    }
)(Component));
