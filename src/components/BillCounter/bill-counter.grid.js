import React, { Component, Fragment } from "react"
import { Row, Col, Table, Alert } from "react-bootstrap"

export default class BillCounterGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            distribute: []
        }
    }

    renderTBody() {
        const { nominals, amounts } = this.props
        return (

            nominals.map((nObj, nKey) => {
                return (
                    <tr key={nObj.idx}>
                        <td>{nObj.nominal}</td>
                        <td>{nObj.count}</td>
                        {amounts.map((aObj, aKey) => {
                            return (
                                <td>{aObj.amount}</td>
                            )
                        }
                        )}
                    </tr>
                )
            })
        )
    }

    renderTHead() {
        const { amounts, nominals } = this.props
        // const { distribute } = this.state

        return (
            <tr>
                <th colspan="2">Nominals</th>
                {amounts.map((item, key) => {
                    return (
                        <th key={key} style={{ textAllign: "center" }}>
                            <div className="text-muted">{item.label}</div>
                            <div>{item.amount}</div>
                        </th>
                    )
                })}
            </tr>
        )
    }

    render() {
        const { amounts, nominals } = this.props
        const { distribute } = this.state
        return (
            <Fragment>
                {nominals.map((nominalObject, key) => {
                    return (
                        <Row key={String("nominal-").concat(key)}>
                            <Col sm={1}>{nominalObject.nominal}</Col>
                            <Col sm={1} key={key}>{nominalObject.nominal}</Col>
                            {amounts.map((amountObject, key) => {
                                return (
                                    <Col
                                        key={String("amount-").concat(key)}
                                        id={amountObject.idx}>
                                        <small>{amountObject.label}</small> {amountObject.amount}
                                    </Col>
                                )
                            })}
                        </Row>
                    )
                })}
            </Fragment>
        )
    }
}

