import React, { Component } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
export default class BillCounterAmountFormItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amount: null,
			name: null,
		}
	}
	// componentDidMount() { console.log(this.state) }
	// componentDidUpdate() { }
	// componentWillUpdate(nextProps, nextState) {	}

	/** SUM FORM-GROUP HANDLERS */
	changeAmountHandler(e) {
		const { value } = e.target
		this.setState({ amount: value })
	}

	changeNameHandler(e) {
		const { value } = e.target
		this.setState({ name: value })
	}

	checkboxAmountHandler(e, idx) {
		const { checked } = e.target
		const { amounts } = this.state

		amounts[Number(idx)].use = checked
		this.setState({ amounts })
	}

	renderAmountItem(idx, key) {
		const { amounts } = this.state
		if (amounts.lenght === 0) {
			return
		}
		const { name, amount, use } = amounts[idx]
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

				<Form.Control type="text" value={name} disabled />
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
		const { name, amount } = this.state
		return (
			<InputGroup className="mb-1" size="sm">
				{/* SUM VALUE */}
				<Form.Control
					type="text"
					placeholder="Организация"
					value={!name ? "" : String(name)}
					onChange={this.changeNameHandler}
				/>
				<Form.Control
					type="text"
					placeholder="Сумма"
					value={!amount || isNaN(amount) ? "" : Number(amount)}
					onChange={this.changeAmountHandler}
				/>
				<InputGroup.Append>
					<Button onClick={this.createAmountItemHandler} disabled={!(amount && name)}>
						<i className="fas fa-plus" />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		)
	}
}
