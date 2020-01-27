import React, { Component } from "react"
import { Form, InputGroup } from "react-bootstrap"

export default class BillCounterAmountFormItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			idx: null,
			amount: 0,
			company: "",
			use: true,
		}
		this.changeCompany = this.changeCompany.bind(this)
		this.changeAmount = this.changeAmount.bind(this)
		this.changeUse = this.changeUse.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {

	}
	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.state !== prevState) {
	// 		const { idx, company, amount, use } = this.state
	// 		this.props.cbUpdateItem(idx, { company: company, amount: amount, use: use });
	// 	}
	// }
	// componentWillUpdate(nextProps, nextState) {	}

	handleChange(e) {
		this.setState({ company: e.target.value }
			// , () => {
			// const { name, value, use } = this.state
			// this.props.cbUpdateAmount(name, value, use);}
		)
	}

	changeCompany(e) {
		const { idx, company, amount, use } = this.state
		this.setState({ company: e.target.value }, () => {
			this.props.cbUpdateItem(idx, { company: company, amount: amount, use: use })
		})
	}
	changeAmount(e) {
		const { idx, company, amount, use } = this.state
		this.setState({ amount: e.target.value }, () => {
			this.props.cbUpdateItem(idx, { company: company, amount: amount, use: use })
		})
	}

	changeUse(e) {
		const { idx, company, amount, use } = this.state
		this.setState({ use: e.target.checked }, () => {
			this.props.cbUpdateItem(idx, { company: company, amount: amount, use: use })
		})
	}

	render() {
		const { idx, company, amount, use } = this.props.item
		return (
			<InputGroup className="mb-1" size="sm" id={String(idx)}>
				<InputGroup.Prepend>
					<InputGroup.Checkbox name="use" onChange={this.changeUse} checked={use} />
				</InputGroup.Prepend>
				<Form.Control
					type="text"
					name="company"
					placeholder="Company name"
					value={company}
					onChange={this.changeCompany}
				/>
				<Form.Control
					type="text"
					name="amount"
					placeholder="Amount"
					value={!amount || isNaN(amount) ? "" : Number(amount)}
					onChange={this.changeAmount}
				/>
			</InputGroup>
		)
	}
}
