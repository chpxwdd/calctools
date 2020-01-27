import React, { Component, Fragment } from "react"
import { Table, Alert } from "react-bootstrap"

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
                        {/* <td>{this.renderNominalActions(aObj)}</td> */}
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
                <th>actions</th>
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
                <Table size="sm" bordered={Boolean(true)} borderless={Boolean(false)} >
                    <thead>{this.renderTHead()}</thead>
                    <tbody>{this.renderTBody()}</tbody>
                </Table >
            </Fragment>
        )

    }

}

