import React, { Component } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

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
			<Form >
				<Form.Group as={Row} controlId="label" className="mb-1">
					<Form.Label column className="d-none d-md-block">Метка</Form.Label>
					<Col>
						<Form.Control size="sm" placeholder="Метка" value={label} onChange={e => this.handleChange("label", e)} />
					</Col>
				</Form.Group >
				<Form.Group as={Row} controlId="amount" className="mb-1">
					<Form.Label column className="d-none d-md-block">Сумма</Form.Label>
					<Col><Form.Control size="sm" placeholder="Сумма" value={!amount || isNaN(amount) ? "" : Number(amount)} onChange={e => this.handleChange("amount", e)} /></Col>
				</Form.Group>
				<Form.Group as={Row} controlId="save" className="mb-1">
					<Col xs={{ span: 6, offset: 6 }} ><Button size="sm" onClick={this.handleSubmit} disabled={Boolean(!amount)} style={{ width: "100%" }} >{isEdit ? "Upd" : "Add"}</Button></Col>
				</Form.Group>
			</Form>

		)
	}
}
