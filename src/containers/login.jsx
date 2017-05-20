import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import Login from '../components/login';
import Header from '../components/header';
import config from '../../config';
import {Row, Col} from 'react-bootstrap';

const mapState = ({loginState}) => {
    return {
        loginState
    }
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
    componentDidMount() {
        if (config.intercom) {
            window.Intercom('boot', {
                app_id: 'scigxdd1'
            });
        }
    },
    render() {
        return (
            <div style={{'height': '100%'}}>
                <Header />
                <div style={{'background': '#f5f5f5', 'height': '100%'}}>
                    <Row>
                        <Col md={12}>
                            <div className="loginForm__title">
                            <h2 style={{'fontWeight': 'bold'}}>Login</h2>
                            <p>Sign into your account</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="container" style={{'maxWidth': '600px !important'}}>
                        <Login router={this.context.router}/>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
