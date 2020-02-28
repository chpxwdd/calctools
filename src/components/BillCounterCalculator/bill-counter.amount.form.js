import React, { Component } from "react"
import { Form, Row, Col } from "react-bootstrap"
import BillCounterAmountFormItem from './bill-counter.amount.form.item'

export default class BillCounterAmountForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
		}

		this.cbUpdateItem = this.cbUpdateItem.bind(this)
	}

	cbUpdateItem(item) {
		const { list } = this.state
		var index;
		if (list.lenght === 0) {
			item.index = 1
		}

		if (list) {
			list[index] = item
		} else {
			delete list[index]
		}
		this.setState({ list: list }, () => {
			this.props.cbUpdateList(list)
		})
	}

	/** */
	render() {
		const { list } = this.state
		return (
			<Form.Row as={Row}>
				{/* {Object.keys(list).map((item, key) => */}
				{list.map((item, key) =>
					<div key={key}>
						<Form.Group as={Col}>
							<BillCounterAmountFormItem cbUpdateItem={this.cbUpdateItem} item={item} />
						</Form.Group>
					</div>
				)}
				<Form.Group as={Col}>
					<BillCounterAmountFormItem cbUpdateItem={this.cbUpdateItem} item={{ amount: 0, company: "", use: false }} />
				</Form.Group>

			</Form.Row >
		)
	}
}
