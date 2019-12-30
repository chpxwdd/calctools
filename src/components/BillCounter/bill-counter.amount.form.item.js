import React, { Component } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
export default class BillCounterAmountFormItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: null,
			name: null,
			use: false,
		}
		this.changeName = this.changeName.bind(this)
		this.changeValue = this.changeValue.bind(this)
		this.changeUse = this.changeUse.bind(this)
	}
	// componentDidMount() { console.log(this.state) }
	// componentDidUpdate() { }
	// componentWillUpdate(nextProps, nextState) {	}
	changeName(e) {
		this.setState({}, function (props, state) {

			props.cbUseNominal(state.name, state.value);
		}

		)
	}
	changeValue(e) { }
	changeUse(e) { }

	render() {
		const { name, value, use } = this.state
		return (
			<InputGroup className="mb-1" size="sm">
				<InputGroup.Prepend>
					<InputGroup.Checkbox onChange={this.useHandler} checked={use} />
				</InputGroup.Prepend>
				<Form.Control
					type="text"
					placeholder="Name"
					value={!name ? "" : String(name)}
					onChange={this.amount}
				/>
				<Form.Control
					type="text"
					placeholder="Amount"
					value={!value || isNaN(value) ? "" : Number(value)}
					onChange={this.changeAmountHandler}
				/>
			</InputGroup>
		)
	}
}
