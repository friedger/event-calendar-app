import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';

const config = require('../../config');
const Link = require('react-router').Link;

import Header from '../components/header';
import NewWidgetButton from '../components/newWidgetButton';
import WidgetButton from '../components/widgetButton';

const mapState = ({appState}) => {
    return {
        appState
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...widgetActions
    }, dispatch);
}

const component = React.createClass({
    componentDidMount() {
        this.props.getWidgets();
    },
    render() {
        if (this.props.children) {
            return (
                <div style={{height: '100%'}}>{this.props.children}</div>
            )
        }

        return (
            <div style={{height: '100%'}}>
                <Header loggedIn={true} useFluidContainer={true}/>
                <div className="container-fluid" style={{marginTop: '50px'}}>
                    <div className="row">
                        <NewWidgetButton onClick={this.props.postWidgets}></NewWidgetButton>
                        {this.props.appState.widgets.map((widget, index) => {
                            return <WidgetButton deleteAction={this.props.deleteWidget} widget={widget} number={index + 1}></WidgetButton>
                        })}
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
