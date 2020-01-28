import React, { Component } from "react"
import { Form, Col, Button } from "react-bootstrap"

export default class BillCounterAmountEditForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			idx: null,
			amount: "",
			label: "",
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	// componentWillReceiveProps(nextProps, nextState) {
	// 	if (nextProps.isEdit) {
	// 	  this.setState({
	// 		label: nextProps.isEdit.label,
	// 		amount: nextProps.isEdit.amount
	// 	  });
	// 	}
	// }

	componentDidMount() {
		// if (this.props.idx)
	}

	handleSubmit(e) {
		const { idx, amount, label } = this.state
		const item = { idx: idx, amount: amount, label: label }
		this.props.cbUpdateAmounts(item)
		this.setState({ idx: null, amount: "", label: "" })
	}

	handleChange(key, e) {
		this.setState({ [key]: e.target.value });
	}

	render() {
		const { isEdit } = this.props
		const { label, amount } = this.state
		return (
			<Form.Row>
				<Form.Group as={Col} lg={2} md={3} sm={4} xs={5}
					controlId="inputElementAmountLabel">
					<Form.Control
						size="sm"
						name="label"
						placeholder="Label"
						value={label}
						onChange={e => this.handleChange("label", e)}
					/>
				</Form.Group>
				<Form.Group as={Col} lg={2} md={3} sm={4} xs={5} controlId="inputElementAmountCount">
					<Form.Control
						size="sm"
						name="amount"
						placeholder="0"
						value={!amount || isNaN(amount) ? "" : Number(amount)}
						onChange={e => this.handleChange("amount", e)}
					/>
				</Form.Group>
				<Form.Group as={Col} lg={1} md={2} sm={4} xs={1} controlId="buttonElementAmountSave">
					<Button
						size="sm"
						variant="primary"
						onClick={this.handleSubmit}
						disabled={Boolean(!amount)}
					>{isEdit ? "Upd" : "Add"}</Button>
				</Form.Group>
			</Form.Row>

		)
	}
}
