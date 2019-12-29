import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import BillCounterNominalForm from "./bill-counter.nominal.form"
export default class BillCounterScene extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amounts: {},
			nominals: {},
		}

		this.collectNominals = this.collectNominals.bind(this)
	}

	collectNominals(nominals) {
		// if (!nominals.lenght) {
		// 	return
		// }
		console.group("NOMINALS")
		nominals.forEach((k, v) => {
			console.log("k", k)
			console.log("v", v)
		})
		console.groupEnd()

		this.setState({ nominals: nominals })
	}

	render() {
		const { nominals } = this.state
		return (
			<div>
				<Row>
					<Col lg={4} md={4}>
						&nbsp;
					</Col>
					<Col lg={8} md={8}>
						{/* <BillCounterCompanyForm collectAmounts={this.collectAmounts} /> */}
					</Col>
				</Row>
				<Row>
					<Col lg={4} md={4}>
						<BillCounterNominalForm nominals={nominals} collectNominals={this.collectNominals} />
					</Col>
					<Col lg={8} md={8}>
						{/* {Object.values(amounts).length > 0 && Object.values(amounts).length > 0 && (
							<BillCounterGrid amounts={amounts} nominals={nominals} />
						)} */}
					</Col>
				</Row>
			</div>
		)
	}
}
