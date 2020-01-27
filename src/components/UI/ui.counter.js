
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
        return (
            <InputGroup size="sm">
                <InputGroup.Prepend>
                    <Button variant="secondary"
                        onClick={(e) => this.props.cbUpdateCount(Number(this.props.value) - 1)}
                        disabled={(min === Number(value) && min !== null) || disabled}
                    ><i className="fa fa-minus" />
                    </Button>
                </InputGroup.Prepend>
                <Form.Control className="bg-default text-secondary"
                    placeholder="0"
                    onChange={this.setValue}
                    value={Number(value)}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button variant="secondary"
                        onClick={(e) => cbUpdateCount(Number(this.props.value) + 1)}
                        disabled={((max === Number(value) && max !== null) || disabled)}
                    ><i className="fa fa-plus" />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}