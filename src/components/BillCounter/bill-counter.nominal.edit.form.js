import React, { Component } from "react"
import { Col, Button, Form, Badge, DropdownButton, Dropdown } from "react-bootstrap"
import UICounter from '../UI/ui.counter'
import { BILL_NOMINALS } from "../../constants/bill-counter.js"


export default class BillCounterNominalEditForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			idx: null,
			nominal: null,
			count: 0
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleAddClick = this.handleAddClick.bind(this)
		this.cbUpdateCount = this.cbUpdateCount.bind(this)
	}

	componentDidMount() {
		this.setState({ nominal: BILL_NOMINALS[0] })
	}


	handleSelectNominal(eventKey, event) {
		this.setState({ nominal: eventKey })
	}

	handleChange(e) {
		this.setState({ nominal: e.target.value })
	}

	handleAddClick(e) {
		const { idx, nominal, count } = this.state
		const item = { idx: idx, nominal: nominal, count: count }
		this.setState((state, props) => {
			return {
				idx: null,
				nominal: String(BILL_NOMINALS.find(val => (nominal !== val && !this.props.cbNominalUse(val)))),
				count: 0
			}
		}, () => { this.props.cbUpdateNominals(item) })
	}

	cbUpdateCount(count) {
		this.setState({ count })
	}


	render() {
		const { count, nominal } = this.state
		const { cbNominalUse } = this.props
		return (
			<Form.Row>
				<Form.Group as={Col} controlId="selectElementNominal" >
					<Form.Control as="select"
						size="sm"
						value={nominal}
						className={String("text-primary bg-light")}
						onChange={this.handleChange}
					>
						{BILL_NOMINALS.map((value, key) =>
							<option key={key} value={value}
								// hidden={cbNominalUse(value)}
								disabled={cbNominalUse(value)}
							>{value}</option>
						)}
					</Form.Control>
				</Form.Group>
				<Form.Group as={Col} controlId="inputElementCount">
					<UICounter value={count} cbUpdateCount={this.cbUpdateCount} min={0} max={null} disabled={Boolean(!nominal)} />
				</Form.Group>
				<Form.Group as={Col} controlId="buttonElementAdd">
					<Button onClick={this.handleAddClick} disabled={Boolean(!(nominal && count))} size="sm">Add</Button>
				</Form.Group>
			</Form.Row >

		)
	}
}
