import React, { Component } from "react"
// import { Form } from "react-bootstrap"
import { BILL_NOMINALS } from "../../constants/bill-counter.js"
import BillCounterNominalFormItem from "./bill-counter.nominal.form.item"

export default class BillCounterNominalForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: {},
		}

		this.cbUpdateItem = this.cbUpdateItem.bind(this)
	}



	cbUpdateItem(nominal, count) {
		const { list } = this.state

		if (count) {
			list[nominal] = count
		} else {
			delete list[nominal]
		}
		this.setState({ list: list }, function () {
			this.props.cbUpdateList(list)
		})
	}

	/** */
	render() {
		return (
			<div>
				{BILL_NOMINALS.map((value, key) => {
					return (
						<div key={key}>
							<BillCounterNominalFormItem denomination={value} cbUpdateItem={this.cbUpdateItem} />
						</div>
					)
				})}
			</div>

		)
	}
}
