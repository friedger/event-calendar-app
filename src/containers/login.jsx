import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import Login from '../components/login';
import Header from '../components/header';
import config from '../../config';

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
            <div>
                <Header />
                <div className="container">
                    <Login router={this.context.router}/>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
