
import React, { Fragment, Component } from 'react'
import { InputGroup, Col, Form, Button } from 'react-bootstrap'
export default class UICounter extends Component {
    constructor(props) {
        super(props)
        this.setValue = this.setValue.bind(this)
        this.incerment = this.incerment.bind(this)
        this.decerment = this.decerment.bind(this)
    }

    incerment(e) {
        this.props.cbUpdateCount(Number(this.props.value) + 1)
    }

    decerment(e) {
        this.props.cbUpdateCount(Number(this.props.value) - 1)
    }

    setValue(e) {
        this.props.cbUpdateCount(Number(e.target.value))
    }

    render() {
        const { min, max, value, cbUpdateCount, disabled } = this.props
        const incDisabled = (max === Number(value) && max !== null) || disabled
        const decDisabled = (min === Number(value) && min !== null) || disabled
        return (
            <InputGroup size="sm" style={{ width: "100px" }}>
                <InputGroup.Prepend>
                    <Button onClick={e => this.props.cbUpdateCount(value - 1)} disabled={decDisabled}><i className="fa fa-minus" /></Button>
                </InputGroup.Prepend>
                <Form.Control name="count" style={{ fontWeight: "600", textAlign: "center" }} onChange={e => cbUpdateCount(Number(e.target.value))}
                    value={value}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button onClick={e => cbUpdateCount(value -
                        1)} disabled={incDisabled} ><i className="fa fa-plus" /></Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}