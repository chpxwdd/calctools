import React, { Component } from "react"
import { Form, InputGroup, Button, Table, Card, Badge, Row, Col, Alert } from "react-bootstrap"

export default class BillCounterCalculator extends Component {
	constructor(props) {
		super(props)
		this.state = { amounts: [], nominals: [] }
	}

	render() {
		const { amounts, nominals } = this.state
		return (
			<div>
				<Row>
					<Col md={{ offset: 3 }}>+</Col>
					<Col md={1}>1</Col>
					<Col md={1}>2</Col>
				</Row>
				<Row>
					<Col md={3}>{/* Для новой строки */}</Col>
					<Col>Grid</Col>
				</Row>
			</div>
		)
	}
}
