import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import BillCounterNominalForm from "./bill-counter.nominal.form"
import BillCounterAmountForm from "./bill-counter.amount.form"
export default class BillCounterScene extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amounts: {},
			nominals: {},
		}

		this.cbUseNominals = this.cbUseNominals.bind(this)
		this.cbUseAmounts = this.cbUseAmounts.bind(this)
	}

	cbUseAmounts(amounts) {
		console.group("amount", amounts)
		this.setState({ amounts: amounts })
		console.groupEnd("amount", amounts)
	}

	cbUseNominals(nominals) {
		console.group("NOMINALS", nominals)
		this.setState({ nominals: nominals })
		console.groupEnd("NOMINALS", nominals)
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
						<BillCounterAmountForm cbUseAmounts={this.cbUseAmounts} />
					</Col>
				</Row>
				<Row>
					<Col lg={4} md={4}>
						<BillCounterNominalForm nominals={nominals} cbUseNominals={this.cbUseNominals} />
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
