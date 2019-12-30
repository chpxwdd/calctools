
import React, { Component } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
export default class UICounter extends Component {

    render() {
        const { min, max, value } = this.props
        return (
            <InputGroup size="sm" >
                <InputGroup.Prepend>
                    <Button onClick={(e) => this.props.cbUpdate(Number(this.props.value) - 1)}
                        variant="dark"
                        disabled={min === Number(value) && min !== null}
                    >
                        <i className="fa fa-minus" />
                    </Button>
                </InputGroup.Prepend>
                <Form.Control
                    placeholder="0"
                    onChange={(e) => this.props.cbUpdate(e.target.value)}
                    value={Number(value)}
                />
                <InputGroup.Append>
                    <Button
                        onClick={(e) => this.props.cbUpdate(Number(this.props.value) + 1)}
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