import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import Login from '../components/login';
import Header from '../components/header';
import config from '../../config';
import {Row, Col, Modal} from 'react-bootstrap';

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
                app_id: config.intercom
            });
        }
    },
    getInitialState() {
        console.log(this.props.location.query.loginFailure)
        return {
            showLoginModal: this.props.location.query.loginFailure
        };
    },
    helpClick(e) {
        e.preventDefault();
        window.Intercom('show');
    },
    render() {
        return (
            <div style={{'height': '100%'}}>
                <Header />
                    <Modal show={this.state.showLoginModal} onHide={() => this.setState({showLoginModal: false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <span>You've been logged out</span>
                            </Modal.Title>
                        </Modal.Header>
                        <div className="col-md-12 connection-modal">
                            <div className="connection-modal__content">
                                <p>
                                    Looks like you tried to access a registered users only page or you're not logged in anymore.
                                </p>
                                <p>If you think something has gone wrong, or you can't log in, please contact us using the <a style={{display: 'inline'}} href="#" onClick={this.helpClick}>help icon</a> in the bottom right hand side of your screen. Thanks!</p>
                            </div>
                            <button onClick={() => this.setState({showLoginModal: false})} className="action full-width">OK, Thanks!</button>

                        </div>
                    </Modal>
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
