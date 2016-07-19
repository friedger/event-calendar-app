const cookieUtil = require('../utils/cookieUtil').default;

import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import * as appActions from '../actions/index';

import RegistrationForm from '../components/register';
import Header from '../components/header';

const mapState = ({appState, loginState}) => {
    return {appState, loginState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount() {
        this.props.popuplateRegisterFormFromQuery(this.props.location.query);
    },
    isUserLoggedIn() {
        if (cookieUtil.getItem('eventcal-admin')) {
            return true;
        }

        return false;
    },
    render() {
        return (
            <div className="help">
                <Header loggedIn={this.isUserLoggedIn()}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">

                            <h1>All Platforms</h1>
                            <h2 id="introduction">Introduction</h2>
                            <p>There are three parts involved in setting up your event calendar.</p>

                            <ol>
                                <li>Linking Event Calendar App with your calendars.</li>
                                <li>Building your calendar and deciding how it will look.</li>
                                <li>Integrating the calendar onto your website.</li>
                            </ol>

                            <p>All of these steps have been designed to be as easy as possible and it is likely that you will be able to complete them without any documentation at all. However, if you get stuck at any point then this documentation will help.</p>

                            <hr></hr>

                            <h2 id="linking">Linking to your calendar</h2>

                            <p>After registering you will be served the &lsquo;link your calendar&rsquo; page. Unfortunately, we can&rsquo;t do anything unless you grant us permission to view your calendar.</p>

                            <p>We will never edit your calendar or add any events to it.</p>

                            <p>To link your calendar, simply click the link my calendar button and you will be taken to Cronofy (a separate service that we use) to grant let us view the events in your calendar.</p>

                            <p>Once you have completed this you will be taken to your Dashboard.
                            </p>

                            <img className="gif-image" alt="linking calendars" src="/images/docs/linking-calendar.gif"></img>

                            <hr></hr>

                            <h2 id="creating">Creating your calendar</h2>

                            <p>Congratulations, you&rsquo;ve granted us permission to use your calendars and you&rsquo;re ready to create your calendar.</p>

                            <p>This part of the process is super, simple. All you need to do is tell us which of your calendars you would like us to use and display on your website. You can do this by using the options at the top.
                            </p>

                            <p>At first, your calendar will be empty as you haven&rsquo;t told Event Calendar App to use any of your calendars.
                            </p>

                            <img className="gif-image" alt="clicking calendars" src="/images/docs/clicking-calendars.gif"></img>

                            <hr></hr>

                            <h2 id="integrating">Integrating your calendar with your website</h2>

                            <p>To add your calendar to your website simply copy and paste your embed code to any web page.
                            </p>

                            <p>If you paste your code onto your site and you see it as plain text then you need to make sure that you paste it while your editor is in &lsquo;HTML&rsquo; mode.
                            </p>

                            <p>Event Calendar App will work on any web platform imaginable, however it is difficult to supply instructions for all of these. If you have any problems what so ever then please contact <a href="mailto:support@eventcalendarapp.com">support@eventcalendarapp.com</a>.
                            </p>

                            <hr></hr>

                            <h1>Shopify</h1>

                            <h2 id="shopify-install">How to install Event Calendar App on Shopify</h2>

                            <p>We&rsquo;ve designed Event Calendar App to be as simple as possible to install on your Shopify site.
                            </p>

                            <ol>
                                <li>Visit the app&rsquo;s Shopify page and click get.</li>
                                <li>Shopify will ask if you would like to install the app.</li>
                                <li>Follow the steps to activate your plan.</li>
                            </ol>

                            <hr></hr>

                            <h2 id="shopify-integrate">How to integrate your calendar onto your shop.</h2>

                            <p>It may help to read the following two sections first:</p>

                            <ul>
                                <li><a href="#linking">Linking to your calendar</a></li>
                                <li><a href="#creating">Creating your calendar</a></li>
                            </ul>

                            <p>These steps are not Shopify specific and are documented previously.</p>

                            <p>Getting your calendar onto your shop is as simple as copying and pasting the embed code to the page on which you want the calendar to appear.
                            </p>

                            <strong>It is hugely important that the click the HTML button before you paste your embed code – otherwise it will not work.</strong>

                            <img className="gif-image" alt="integrating calendar with shopify gif" src="/images/docs/integrating-shopify.gif"></img>

                        </div>
                        <div className="col-md-4">
                            <h3 style={{'margin-top':50 + 'px'}}>All Platforms</h3>
                            <ul>
                                <li><a href="#introduction">Introduction</a></li>
                                <li><a href="#linking">Linking to your calendar</a></li>
                                <li><a href="#creating">Creating your calendar</a></li>
                                <li><a href="#integrating">Integrating your calendar on your website</a></li>
                            </ul>
                            <h3>Shopify</h3>
                            <ul>
                                <li>
                                    <a href="#shopify-install">How to install on Shopify</a>
                                </li>
                                <li>
                                    <a href="#shopify-integrate">How to integrate your calendar onto your shop.</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
