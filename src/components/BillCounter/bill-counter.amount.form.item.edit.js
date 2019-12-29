import React, { Component } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
export default class BillCounterAmountEditForm extends Component {
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
	
	/** */
	render() {
		const { name, amount } = this.state
		return (
			<InputGroup className="mb-1" size="sm">
				{/* SUM VALUE */}
				<Form.Control
					type="text"
					placeholder="Title"
					value={!name ? "" : String(name)}
					onChange={this.changeNameHandler}
				/>
				<Form.Control
					type="text"
					placeholder="Amount"
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
