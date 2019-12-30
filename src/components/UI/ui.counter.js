
import React, { Component } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
export default class UICounter extends Component {
    constructor(props) { super(props) }
    render() {
        const { min, max, value, cbCount } = this.props
        return (
            <InputGroup size="sm" >
                <InputGroup.Prepend>
                    <Button onClick={(e) => this.props.cbCount(Number(this.props.value) - 1)}
                        variant="dark"
                        disabled={min === Number(value) && min !== null}
                    >
                        <i className="fa fa-minus" />
                    </Button>
                </InputGroup.Prepend>
                <Form.Control
                    placeholder="0"
                    onChange={(e) => cbCount(e.target.value)}
                    value={Number(value)}
                />
                <InputGroup.Append>
                    <Button
                        onClick={(e) => cbCount(Number(this.props.value) + 1)}
                        variant="dark"
                        disabled={(max === Number(value) && max !== null)}
                    >
                        <i className="fa fa-plus" />
                    </Button>
                </InputGroup.Append>
            </InputGroup >
        )
    }
}