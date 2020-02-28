import React, { Component } from "react"
import { Badge, Table } from "react-bootstrap"

export default class BillCounterGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            distribute: []
        }
    }
    render() {
        const { amounts, nominals, rows } = this.props
        return (
            <Table size="sm" responsive={true}>
                <thead>
                    <tr className="text-center">
                        <th>номинал</th><th>eд.<div><small>на сумму</small></div></th>
                        {amounts.map((aObj, key) => <th key={key}>{aObj.amount}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {nominals.map((nObj, nKey) => {
                        // const nominalItem = nominals.filter(row => row === row.idx)
                        const n = nObj.idx
                        const { count, nominal } = nObj
                        const nominalTotal = count * nominal
                        return (
                            <tr key={nKey} className="text-center">
                                <th className="text-left" style={{ width: "80px", verticalAlign: "middle" }}>{nominal}</th>
                                <td className="text-center" style={{ width: "40px" }}>
                                    <div><Badge variant="primary">{count}</Badge></div>
                                    <div><small>{nominalTotal}</small></div>
                                </td>

                                {amounts.map((aObj, aKey) => {
                                    const a = aObj.idx
                                    const cellValue = isNaN(rows[n][a]) ? 0 : rows[n][a]
                                    return (
                                        <td key={aKey}>
                                            <div><Badge variant={!rows[n][a] ? "light" : "success"}>{cellValue}</Badge></div>
                                            <div><small>{(nominal * cellValue)}</small></div>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        )
    }
}

