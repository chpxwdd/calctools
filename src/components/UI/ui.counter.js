
import React, { Fragment, Component } from 'react'
import { InputGroup, Col, Form, Button } from 'react-bootstrap'

export default class UICounter extends Component {
    constructor(props) {
        super(props)
        this.setValue = this.setValue.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    increment(e) {
        const { obj, value, cbUpdateCount } = this.props
        console.log("obj")
        cbUpdateCount(Number(value) + 1, obj ? obj : null)
    }

    decrement(e) {
        const { obj, value, cbUpdateCount } = this.props
        cbUpdateCount(Number(value) - 1, obj ? obj : null)
    }

    setValue(e) {
        const { value } = e.target
        const { obj, cbUpdateCount } = this.props
        cbUpdateCount(Number(value), obj ? obj : null)
    }

    render() {
        const { min, max, value, bsSize, width, disabled, name } = this.props
        const incDisabled = (max === Number(value) && max !== null) || disabled
        const decDisabled = (min === Number(value) && min !== null) || disabled
        return (
            <InputGroup size={bsSize} style={{ width: width ? width : "auto", textAlign: "center" }} controlid={name ? name : "count"}>
                <InputGroup.Prepend>
                    <Button onClick={this.decrement} disabled={decDisabled}>
                        <i className="fa fa-minus" />
                    </Button>
                </InputGroup.Prepend>
                <Form.Control onChange={this.setValue} value={value} disabled={disabled} name={name ? name : "count"} />
                <InputGroup.Append>
                    <Button onClick={this.increment} disabled={incDisabled} >
                        <i className="fa fa-plus" />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}