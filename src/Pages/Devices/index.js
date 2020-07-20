import axios from 'axios'

import React, { Component } from 'react'

import stateMachine from '../../services/statemachine'
// import deviceSvc from '../../services/devices'

import { Row, Col } from 'react-bootstrap'

import DeviceCard from '../../Components/DeviceCard'
import Loading from '../../Components/Loading'

const DeviceCards = ({ devices, roles, user }) => {
    var DeviceCardsResult = devices.map(device => {
        return (
            <DeviceCard key={device.id} device={device} roles={roles} user={user} />
        )
    })

    return DeviceCardsResult
}

class Devices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...{
                devices: [],
                roles: [],
                loading: true
            }, ...props
        }

        console.log('Devices', 'props', props)
    }

    componentDidMount() {
        this.getDevices()
        setInterval(this.getDevices.bind(this), 5000)

        stateMachine.attach('loggedIn', this.setState.bind(this))
        stateMachine.attach('user', this.setState.bind(this))
        stateMachine.attach('devices', this.setState.bind(this))

        if (this.state)
            this.setState({ loading: false })
    }

    async getDevices() {
        let response = await axios.get('/api/devices/')
        console.log(response.data)
        this.setState({ devices: response.data })
    }

    render() {
        return (
            <Loading loading={this.state.loading}>
                <Row>
                    <Col>
                        <h1>Devices</h1>
                    </Col>
                </Row>
                <Row>
                    {this.state.devices.length > 0 ? <DeviceCards devices={this.state.devices} roles={this.state.roles} user={this.state.user} /> : <span>Sorry! We can't find any devices at this time!</span>}
                </Row>
            </Loading>
        )
    }
}

export default Devices