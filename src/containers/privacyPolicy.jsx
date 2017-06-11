import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import * as appActions from '../actions/index';
import * as paymentActions from '../actions/paymentActions';
import Header from '../components/header';

const mapState = ({appState}) => {
    return {appState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions,
        ...paymentActions
    }, dispatch);
}

const component = React.createClass({
    render() {
        return (
            <div className="privacy-policy component-root">
                <Header loggedIn={false}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="strong">Event Calendar App Privacy Policy</h2>
                            The short version:
                            <ul>
                                <li>
                                    We collect anonymous statistics about your visit, like which of our pages you viewed.
                                </li>
                                <li>
                                    If you sign up with us we take great care to keep your information safe and we’ll never share it with others without your express permission.
                                </li>
                                <li>
                                    We never share your data with 3rd parties except to help us deliver our own services.
                                </li>
                            </ul>
                            <p>Our privacy policy:</p>

                            <h2>What we collect</h2>
                            <p>We may collect the following information:</p>
                            <ul>
                                <li>your name</li>
                                <li>email address</li>
                                <li>any information contained within your calendar(s)</li>
                            </ul>
                            <p>You are not required to provide any of this information, but if you do not, we may not be able to provide you the requested services.</p>

                            <h2>What we do with the information we gather</h2>
                            <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                            <ul>
                                <li>Provide you with the service of which you have signed up for</li>
                                <li>Provide you with personalised visits to our platform</li>
                                <li>Internal record keeping.</li>
                                <li>We may use the information to improve our products and services.</li>
                                <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
                            </ul>

                            <h2>Your calendar information</h2>
                            <p>We use your calendar data to populate the Event Calendar that Event Calendar App places on your website. Due to the nature of how Event Calendar App works, calendar information that you share with us may become publically available.</p>
                            <p>Event Calendar App gives you the functionality from your dashboard to decide which calendars do and do not become publically available.</p>
                            <p>It is up to you, the user, to ensure that you are happy with all information shared on your calendar.</p>
                            <p>Event Calendar App is not liable for any private data accidentally shared from your calendar.</p>

                            <h2>Security</h2>
                            <p>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>

                            <h2>Online payment</h2>
                            <p>Event Calendar App does not personally hold any of your payment information. We use a range of third party services to process your payment such as Stripe, and Shopify.</p>
                            <p>We share information with these companies only to the extent necessary for the purposes of processing payments you make via our website.</p>

                            <h2>How we use cookies</h2>
                            <p>A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                            <p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                            <p>Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
                            <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>

                            <h2>Links to other websites</h2>
                            <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>

                            <h2>Controlling your personal information</h2>
                            <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.</p>
                            <p>You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write to support@eventcalendarapp.com.</p>
                            <p>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible at the above address. We will promptly correct any information found to be incorrect.</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
