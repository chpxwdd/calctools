import React, { Component } from "react"
import { Form, Row, Col } from "react-bootstrap"
import BillCounterAmountFormItem from './bill-counter.amount.form.item'

export default class BillCounterAmountForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amounts: {},
		}

		this.cbUseAmount = this.cbUseAmount.bind(this)
	}

	cbUseAmount(amount) {
		const { amounts } = this.state

		if (amounts) {
			amounts[amount.name] = amount
		} else {
			delete amounts[amount.name]
		}
		this.setState({ amounts: amounts }, function (props, state) {
			this.props.cbUseAmounts(amounts)
		})
	}

	/** */
	render() {
		const { amounts } = this.state
		return (
			<Form.Row as={Row}>
				{Object.keys(amounts).map((amount, key) =>
					<div key={key}>
						<Form.Group as={Col}>
							<BillCounterAmountFormItem cbUseAmount={this.cbUseAmount} value={amount.value} name={amount.name} use={amount.use} />
						</Form.Group>
					</div>
				)}

				<Form.Group as={Col}>
					<BillCounterAmountFormItem
						cbUseAmount={this.cbUseAmount}
						amount={{ name: "Company".concat(String(Number(amounts.length) + 1)), value: null, use: true }}
					/>
				</Form.Group>
			</Form.Row >
		)
	}
}
