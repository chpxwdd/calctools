
import React, { Component } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
export default class UICounter extends Component {
    constructor(props) {
        super(props)
        this.setValue = this.setValue.bind(this)
        this.incerment = this.incerment.bind(this)
        this.decerment = this.decerment.bind(this)
    }

    incerment(e) {
        this.props.cbCount(Number(this.props.value) + 1)
    }

    decerment(e) {
        this.props.cbCount(Number(this.props.value) - 1)
    }

    setValue(e) {
        this.props.cbCount(Number(e.target.value))
    }

    render() {
        const { min, max, value, cbCount, disabled } = this.props
        return (
            <InputGroup size="sm" >
                <InputGroup.Prepend>
                    <Button
                        onClick={(e) => this.props.cbCount(Number(this.props.value) - 1)}
                        disabled={(min === Number(value) && min !== null) || disabled}
                    >
                        <i className="fa fa-minus" />
                    </Button>
                </InputGroup.Prepend>
                <Form.Control
                    placeholder="0"
                    onChange={(e) => cbCount(e.target.value)}
                    value={Number(value)}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        onClick={(e) => cbCount(Number(this.props.value) + 1)}
                        disabled={((max === Number(value) && max !== null) || disabled)}
                    >
                        <i className="fa fa-plus" />
                    </Button>
                </InputGroup.Append>
            </InputGroup >
        )
    }
}