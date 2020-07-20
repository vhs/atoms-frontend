import React, { Component } from 'react'

class LoadingScreen extends Component {
    render() {
        return (
            <>
                {this.props.loading ? this.props.children : "Loading..."}
            </>
        )
    }
}