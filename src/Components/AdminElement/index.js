import React, { Component } from 'react'

class AdminElement extends Component {
    constructor(props) {
        super(props)
        console.log('AdminElement', 'props', props)
    }
    
    render() {
        return (
            <>
                {this.props.user.administrator ? this.props.children : null}
            </>
        )
    }
}

export default AdminElement