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

		this.collectNominal = this.collectNominal.bind(this)
	}

	componentDidMount() {}
	componentDidUpdate() {
		const { nominals } = this.state
		this.props.collectNominals(nominals)
	}

	componentWillUpdate(nextProps, nextState) {}

	collectNominal(nominal, count) {
		const { nominals } = this.state

		if (count) {
			nominals[nominal] = count
		} else {
			delete nominals[nominal]
		}
		this.setState({ nominals: nominals })
	}

	/** */
	render() {
		return (
			<Form>
				{BILL_NOMINALS.map(value => (
					<BillCounterNominalFormItem nominal={value} collectNominal={this.collectNominal} />
				))}
			</Form>
		)
	}
}
