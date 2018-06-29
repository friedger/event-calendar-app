require('./style.scss');

import React from 'react';
import FacebookPageForm from '../facebookPageForm';

export default React.createClass({
    render() {
        return (
            <div className="facebook-select">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 facebook-select__header">
                            <h2>Which Facebook page do your events belong to?</h2>
                        </div>
                    </div>
                    <div className="row facebook-select__container">
                        <div className="col-md-12 facebook-select__pages">
                            <div className="facebook-select__section-header">
                                <h3>Pages that belong to your account</h3>
                                <p>These are the Facebook pages we found that already exist in your Facebook account. We can only sync with Facebook pages that your Facebook account created or is an admin of. </p>
                            </div>
                            {this.props.pages && this.props.pages.map(page => {
                                return (<div className="facebook-select__page" onClick={() => this.props.postFacebookCalendar(page, true)}>
                                    <i className="fa fa-facebook-square" aria-hidden="true"></i> {page.name}
                                </div>);
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
