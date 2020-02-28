
import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'

const UICounter = (props) => {

    const { idx, value, cbUpdateCount, disabled } = props
    return (
        <InputGroup size="sm">
            <InputGroup.Prepend>
                <Button onClick={(e) => cbUpdateCount(value - 1, idx)} disabled={((0 === Number(value) && 0 !== null) || disabled)}><i className="fa fa-minus" /></Button>
            </InputGroup.Prepend>
            <Form.Control onChange={(e) => cbUpdateCount(e.target.value, idx)} value={value} disabled={disabled} />
            <InputGroup.Append>
                <Button onClick={(e) => cbUpdateCount(value + 1, idx)}><i className="fa fa-plus" /></Button>
            </InputGroup.Append>
        </InputGroup >
    )
}
export default UICounter