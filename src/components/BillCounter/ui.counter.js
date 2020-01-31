
import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'

const UICounter = (props) => {

    const { idx, value, cbUpdateCount, disabled } = props

    const increment = () => {
        console.log(Number(value) + 1)
        cbUpdateCount(Number(value) + 1, idx)
    }

    const decrement = () => {
        cbUpdateCount(Number(value) - 1, idx)
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        cbUpdateCount(Number(e.target.value), idx)
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Prepend>
                <Button onClick={decrement} disabled={((0 === Number(value) && 0 !== null) || disabled)}><i className="fa fa-minus" /></Button>
            </InputGroup.Prepend>
            <Form.Control onChange={handleChange} value={value} disabled={disabled} />
            <InputGroup.Append>
                <Button onClick={increment}><i className="fa fa-plus" /></Button>
            </InputGroup.Append>
        </InputGroup >
    )

}
export default UICounter