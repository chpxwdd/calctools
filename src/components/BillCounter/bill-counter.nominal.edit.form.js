import React, { Component } from "react"
import { Col, Button, Form, Badge, DropdownButton, Dropdown } from "react-bootstrap"
import UICounter from '../UI/ui.counter'
import { BILL_NOMINALS } from "../../constants/bill-counter.js"


export default class BillCounterNominalEditForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			idx: "",
			nominal: BILL_NOMINALS[0],
			count: 0
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleAddClick = this.handleAddClick.bind(this)
		this.cbUpdateCount = this.cbUpdateCount.bind(this)
	}

	// componentDidMount() { this.setState({ nominal: BILL_NOMINALS[0] }) }

	// shouldComponentUpdate(nextProps, nextState, cb) {
	// 	return true
	// }

	handleChange(e) {
		this.setState({ nominal: e.target.value })
	}

	handleAddClick(e) {
		const { idx, nominal, count } = this.state
		const item = { idx: idx, nominal: nominal, count: count }
		this.setState((state, props) => {
			return {
				idx: "",
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

				<Form.Group as={Col} lg={2} md={3} sm={4} xs={5} controlId="selectElementNominal" >
					<Form.Control as="select" size="sm" value={nominal} onChange={this.handleChange} className="bg-light">
						{BILL_NOMINALS.map((value, key) => {
							const use = cbNominalUse(value)
							return (<option key={key} value={value} disabled={use} >{value} </option>)
						})}
					</Form.Control>
				</Form.Group>
				<Form.Group as={Col} lg={2} md={3} sm={4} xs={5} controlId="inputElementCount">
					<UICounter value={count} cbUpdateCount={this.cbUpdateCount} min={0} max={null} disabled={Boolean(!nominal)} />
				</Form.Group>
				<Form.Group as={Col} lg={1} md={2} sm={4} xs={1} controlId="buttonElementAdd">
					<Button onClick={this.handleAddClick} disabled={Boolean(!(nominal && count))} size="sm">Add</Button>
				</Form.Group>
			</Form.Row >

		)
	}
}
