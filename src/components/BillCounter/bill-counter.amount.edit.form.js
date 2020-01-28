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
			<Form inline className="mb-2">
				<Form.Group controlId="label" className="mr-2">
					<Form.Label style={{ width: "100px", justifyContent: "right" }} className="mr-1">Метка</Form.Label>
					<Form.Control style={{ width: "100px" }}
						size="sm"
						id="label"
						placeholder="Label"
						value={label}
						onChange={e => this.handleChange("label", e)}
					/>
					{/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
				</Form.Group >
				<Form.Group controlId="amount" className="mr-2">
					<Form.Label style={{ width: "100px", justifyContent: "right" }} className="mr-1">Сумма</Form.Label>
					<Form.Control style={{ width: "100px" }}
						size="sm"
						id="amount"
						placeholder="0"
						value={!amount || isNaN(amount) ? "" : Number(amount)}
						onChange={e => this.handleChange("amount", e)}
					/>
				</Form.Group>
				<Form.Group controlId="save" className="mr-2">
					<Button size="sm"
						id="save"
						onClick={this.handleSubmit}
						disabled={Boolean(!amount)}
					>{isEdit ? "Upd" : "Add"}</Button>
				</Form.Group>
			</Form>

		)
	}
}
