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
                            <h2 className="strong">Event Calendar App Terms Of Use</h2>
                            <p>Welcome to Event Calendar App. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Event Calendar App's relationship with you in relation to this application. If you disagree with any part of these terms and conditions, please do not use our website.</p>
                            <p>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>

                            <h2>Limitations</h2>
                            <p>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</p>

                            <h2>Links</h2>
                            <p>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</p>

                            <h2>Service Levels</h2>
                            <p>We endeavour to ensure that Event Calendar App is functioning as intended 100% of the time.</p>
                            <p>However, you understand and agree that Event Calendar App is not liable for any loss or damage as a result of our service being unavailable.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
