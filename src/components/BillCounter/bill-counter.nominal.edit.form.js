import React, { Fragment, Component } from "react"
import { Row, Col, Button, Form, Badge, DropdownButton, Dropdown } from "react-bootstrap"
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
		this.handleSave = this.handleSave.bind(this)
		this.cbUpdateCount = this.cbUpdateCount.bind(this)
		this.hasNominalUsed = this.hasNominalUsed.bind(this)
	}

	// shouldComponentUpdate(nextProps, nextState, cb) {
	// 	return true
	// }

	hasNominalUsed(nominal) {
		const { nominals } = this.props
		return nominals.some(item => String(item.nominal) === String(nominal));
	}

	handleChange(e) {
		this.setState({ nominal: e.target.value })
		console.log()
	}

	handleSave(e) {
		this.setState((state, props) => {
			return {
				idx: "",
				nominal: String(BILL_NOMINALS.find(val => (state.nominal !== val && !props.cbNominalUse(val)))),
				count: 0
			}
		}, this.props.cbUpdateNominals({ ...this.state }))
	}

	cbUpdateCount(count) {
		this.setState({ count })
	}


	render() {
		const { count, nominal } = this.state
		const { cbNominalUse } = this.props
		return (
			<Fragment >
				<Form inline className="mb-2">
					<Form.Group controlId="nominal" className="mr-2">
						<Form.Label style={{ width: "100px", justifyContent: "right" }} className="mr-1">Номинал</Form.Label>
						<Form.Control style={{ width: "100px" }} as="select" size="sm" value={nominal} onChange={this.handleChange} id="nominal">
							{BILL_NOMINALS.map((value, key) => <option key={key} value={value} disabled={cbNominalUse(value)} >{value} </option>)}
						</Form.Control>
						{/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
					</Form.Group >
					<Form.Group controlId="count" className="mr-2">
						<Form.Label style={{ width: "100px", justifyContent: "right" }} className="mr-1">Количество</Form.Label>
						<UICounter value={count} cbUpdateCount={this.cbUpdateCount} min={0} max={null} disabled={Boolean(!nominal)} />
					</Form.Group>
					<Form.Group controlId="save">
						<Button onClick={this.handleSave} disabled={Boolean(!(nominal && count))} size="sm" name="save">Add</Button>
					</Form.Group>
				</Form >

			</Fragment >

		)
	}
}
