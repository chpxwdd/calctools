import React, { Component } from "react"
import { Col, Row, Form, InputGroup, Button } from "react-bootstrap"
import UICounter from '../UI/ui.counter'
export default class BillCounterNominalFormItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			nominal: null,
			count: null,
			use: false,
		}

		this.checkboxNominalHandler = this.checkboxNominalHandler.bind(this)
		this.changeNominalHandler = this.changeNominalHandler.bind(this)
		this.updateCount = this.updateCount.bind(this)
	}
	componentDidMount() {
		const { nominal } = this.props
		this.setState({ nominal: nominal })
	}

	// componentDidUpdate() {}
	// componentWillReceiveProps(nextProps, nextState) {}

	changeNominalHandler(e) {
		const { value } = e.target
		if (!Number(value)) {
			return
		}
		this.setState({ count: value })
	}

	checkboxNominalHandler(e) {
		const { checked } = e.target
		this.setState({ count: 0, use: Boolean(checked) })
	}

	updateCount(count) {
		console.log("calback UPdate")
		this.setState({ count: count })
	}

	render() {
		const { count, use, nominal } = this.state
		return (

			<Row >
				<Form.Group className='mb-1' as={Col}>
					<InputGroup key={nominal} size="sm">
						<InputGroup.Prepend>
							<InputGroup.Checkbox onChange={this.checkboxNominalHandler} checked={use} />
						</InputGroup.Prepend>
						<Form.Control value={nominal} disabled />

					</InputGroup>
				</Form.Group>
				<Form.Group className='mb-1' as={Col}>
					{use && <UICounter value={count} cbUpdate={this.updateCount} min={0} max={null} />}
				</Form.Group>
			</Row>

		)
	}
}
