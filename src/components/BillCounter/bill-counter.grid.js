import React, { Component } from "react"
import { Table } from "react-bootstrap"

export default class BillCounterGrid extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <Table>
                <thead>
                    <tr>
                        <th>SUM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>N</td>
                    </tr>
                </tbody>
            </Table>
        )

    }

}

