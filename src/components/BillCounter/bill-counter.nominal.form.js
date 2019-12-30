import React, { Component } from "react"
import { Form } from "react-bootstrap"
import { BILL_NOMINALS } from "../../constants/bill-counter.js"
import BillCounterNominalFormItem from "./bill-counter.nominal.form.item"

export default class BillCounterNominalForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			nominals: {},
		}

		this.cbUseNominal = this.cbUseNominal.bind(this)
	}



	cbUseNominal(nominal, count) {
		const { nominals } = this.state

		if (count) {
			nominals[nominal] = count
		} else {
			delete nominals[nominal]
		}
		this.setState({ nominals: nominals }, function (props, state) {
			this.props.cbUseNominals(nominals)

		})
	}

	/** */
	render() {
		return (
			<div>
				{BILL_NOMINALS.map((value, key) => {
					return (
						<div key={key}>
							<BillCounterNominalFormItem nominal={value} cbUseNominal={this.cbUseNominal} />
						</div>
					)
				})}
			</div>

		)
	}
}
