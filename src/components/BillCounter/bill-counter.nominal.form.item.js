import React, { Component } from "react"
import { Col, Row, Form, InputGroup, Button } from "react-bootstrap"

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
		this.decrement = this.decrement.bind(this)
		this.increment = this.increment.bind(this)
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
		this.setState({ use: Boolean(checked) })
	}
	increment() {
		const { count } = this.state
		this.setState({ count: count + 1 })
	}
	decrement() {
		const { count } = this.state

		this.setState({ count: count - 1 })
	}
	render() {
		const { count, use, nominal } = this.state
		return (
			<Row className="mb-2">
				<Col lg={10} md={9} sm={8} xs={6} className="mt-1">
					<InputGroup key={nominal} size="sm">
						<InputGroup.Prepend>
							<InputGroup.Checkbox onChange={this.checkboxNominalHandler} checked={use} />
						</InputGroup.Prepend>
						<Form.Control value={nominal} disabled />
					</InputGroup>
				</Col>
				<Col lg={2} md={3} sm={4} xs={6} className="mt-1">
					<InputGroup key={nominal} size="sm">
						<InputGroup.Prepend>
							<Button
								onClick={this.decrement}
								variant="info"
								// variant={use ? "info" : "muted"}
								disabled={!use || !count}
							>
								<i className="fa fa-minus" />
							</Button>
						</InputGroup.Prepend>
						<Form.Control onChange={this.changeNominalHandler} value={count} disabled={!use} />
						<InputGroup.Append>
							<Button
								onClick={this.increment}
								// variant={use ? "secondary" : "muted"}
								variant="info"
								disabled={!use}
							>
								<i className="fa fa-plus" />
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</Col>
			</Row>
		)
	}
}
