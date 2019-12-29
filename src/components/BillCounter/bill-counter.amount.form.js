import React, { Component } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"

export default class BillCounterAmountForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: null,
			name: null,
			amounts: {},
		}

		/** Amount Form */
		this.changeAmountHandler = this.changeAmountHandler.bind(this)
		this.changeCompanyHandler = this.changeCompanyHandler.bind(this)
		this.createAmountItemHandler = this.createAmountItemHandler.bind(this)
		this.removeAmountItemHandler = this.removeAmountItemHandler.bind(this)
		this.updateAmountItemHandler = this.updateAmountItemHandler.bind(this)
		this.checkboxAmountHandler = this.checkboxAmountHandler.bind(this)

		/** SUBMITING FORM*/
		this.submitHandler = this.submitHandler.bind(this)
	}

	// componentWillUpdate(nextProps, nextState) {}
	/** SUM FORM-GROUP HANDLERS */
	changeAmountHandler(e) {
		const { value } = e.target
		this.setState({ value: value })
	}

	changeCompanyHandler(e) {
		const { value } = e.target
		this.setState({ name: value })
	}

	checkboxAmountHandler(e, idx) {
		const { checked } = e.target
		const { amounts } = this.state

		amounts[Number(idx)].use = checked
		this.setState({ amounts })
	}

	createAmountItemHandler(e) {
		const { amounts, name, value } = this.state
		/**  @todo add check containst ORG NAME*/
		amounts[Object.keys(amounts).length + 1] = { company: name, amount: value, use: true }
		this.setState({
			amounts,
			value: null,
			name: null,
		})
	}

	updateAmountItemHandler(e, idx) {
		console.log("updateAmountItemHandler", e, idx)
	}

	removeAmountItemHandler(e, idx) {
		const { amounts } = this.state
		delete amounts[idx]
		this.setState({ amounts: amounts })
	}

	/** RENDERING */
	/** */
	renderAddAmountInputGroup() {
		const { value, name } = this.state
		return (
			<InputGroup className="mb-1" size="sm">
				{/* SUM VALUE */}
				<Form.Control
					type="text"
					placeholder="Организация"
					value={!name ? "" : String(name)}
					onChange={this.changeCompanyHandler}
				/>
				<Form.Control
					type="text"
					placeholder="Сумма"
					value={!value || isNaN(value) ? "" : Number(value)}
					onChange={this.changeAmountHandler}
				/>
				<InputGroup.Append>
					<Button onClick={this.createAmountItemHandler} disabled={!(value && name)}>
						<i className="fas fa-plus" />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		)
	}

	renderAmountItem(idx, key) {
		const { amounts } = this.state
		if (amounts.lenght == 0) {
			return
		}
		const { company, amount, use } = amounts[idx]
		return (
			<InputGroup key={key} className="mb-1" size="sm">
				{/* SUM VALUE */}
				<InputGroup.Prepend>
					<InputGroup.Checkbox
						title="Исключить из расчета"
						name={"amountCheckbox" + idx}
						// data-idx={idx}
						onChange={e => this.checkboxAmountHandler(e, idx)}
						checked={use}
					/>
				</InputGroup.Prepend>

				<Form.Control type="text" value={company} disabled />
				<Form.Control type="text" value={amount} disabled />

				<InputGroup.Append>
					{/* <Button
                        title="Редактировать позицию"
                        variant="primary"
                        onClick={(e) => this.removeAmountItemHandler(e, idx)}
                        disabled={!use}
                    >
                        <i className="fas fa-save" />
                    </Button> */}
					<Button
						title="Редактировать позицию"
						variant={use ? "danger" : "secondary"}
						onClick={e => this.removeAmountItemHandler(e, idx)}
						disabled={!use}
					>
						<i className="fas fa-trash" />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		)
	}

	/** */
	render() {
		const { amounts, nominals } = this.state
		return (
			<Form>
				{Object.keys(amounts).map((idx, key) => this.renderAmountItem(idx, key))}
				{this.renderAddAmountInputGroup()}
			</Form>
		)
	}
}
