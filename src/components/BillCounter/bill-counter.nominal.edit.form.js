import React, { Fragment, Component } from "react"
import { Row, Col, Button, Form, Badge, DropdownButton, Dropdown } from "react-bootstrap"
import UICounter from '../UI/ui.counter'
import { BILL_NOMINALS } from "../../constants/bill-counter.js"


export default class BillCounterNominalEditForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			idx: "",
			nominal: String(BILL_NOMINALS.find(val => (!props.cbNominalUse(val)))),
			count: 0
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.cbUpdateCount = this.cbUpdateCount.bind(this)
		this.hasNominalUsed = this.hasNominalUsed.bind(this)
	}

	hasNominalUsed(nominal) {
		const { nominals } = this.props
		return nominals.some(item => String(item.nominal) === String(nominal));
	}

	handleChange(e) {
		this.setState({ nominal: e.target.value })
	}

	handleSave(e) {
		const { count } = this.state
		this.setState((state, props) => {
			return { idx: "", nominal: String(BILL_NOMINALS.find(val => (state.nominal !== val && !props.cbNominalUse(val)))), count: 0 }
		}, this.props.cbUpdateNominals({ ...this.state, count: count }, "create"))
	}

	cbUpdateCount(count) { this.setState({ count }) }

	render() {
		const { count, nominal } = this.state
		const { cbNominalUse } = this.props
		return (
			<Fragment>
				<Form>
					<Form.Group as={Row} controlId="nominal" size="sm" className="mb-1">
						<Form.Label column className="d-none d-md-block">Номинал</Form.Label>
						<Col>
							<Form.Control as="select" size="sm" value={nominal} onChange={this.handleChange} >
								{BILL_NOMINALS.map((value, key) => <option key={key} value={value} disabled={cbNominalUse(value)} >{value}</option>)}
							</Form.Control>
							{/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
						</Col>
					</Form.Group >
					<Form.Group as={Row} controlId="count" className="mb-1">
						<Form.Label column className="d-none d-md-block">Количество</Form.Label>
						<Col>
							<UICounter bsSize={"sm"} value={count} obj={this.state} cbUpdateCount={this.cbUpdateCount} min={0} max={null} disabled={Boolean(!nominal)} />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="save" className="mb-1">
						<Col xs={{ span: 6, offset: 6 }} >
							<Button onClick={this.handleSave} disabled={Boolean(!(nominal && count))} size="sm"
								style={{ width: "100%" }}>Add</Button>
						</Col>
					</Form.Group>
				</Form >
			</Fragment >

		)
	}
}
