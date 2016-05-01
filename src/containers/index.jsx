import React from 'react';

export default React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
                <div className="built-by hidden-xs"><img src="http://alexperry.io/images/profileimage.jpg"/>
                    <span>Built by <a href="http://alexperry.io">alexperry.io</a>
                    </span>
                </div>
            </div>
        )
    }
})
