import React, { Component } from "react"
import { Col, Row, Form, InputGroup } from "react-bootstrap"
import UICounter from '../UI/ui.counter'
export default class BillCounterNominalFormItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			nominal: "",
			count: null,
			use: false,
		}

		this.useHandler = this.useHandler.bind(this)
		this.cbCount = this.cbCount.bind(this)
	}

	componentDidMount() {
		const { nominal } = this.props
		this.setState({ nominal: nominal, count: null })
	}


	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return !(nextState.count !== this.state.count && nextState.use === this.state.use)
	}

	useHandler(e) {
		const { checked } = e.target
		this.setState({ count: 0, use: Boolean(checked) })
		// this.setState({ use: Boolean(checked) })
	}

	cbCount(count) {
		console.log("callback cbUpdate", count)
		const { nominal } = this.state
		this.setState({ nominal: nominal, count: count }, function (props, state) {
			this.props.cbUseNominal(nominal, Number(count));
		})
	}

	render() {
		const { count, use, nominal } = this.state
		return (

			<Row >
				<Form.Group className='mb-1' as={Col}>
					<InputGroup key={nominal} size="sm">
						<InputGroup.Prepend>
							<InputGroup.Checkbox onChange={this.useHandler} checked={use} />
						</InputGroup.Prepend>
						<Form.Control value={nominal} disabled />
					</InputGroup>
				</Form.Group>
				<Form.Group className='mb-1' as={Col}>
					{/* {use && <UICounter value={count} cbCount={this.cbCount} min={0} max={null} />} */}
					<UICounter value={count} cbCount={this.cbCount} min={0} max={null} disabled={!use} />
				</Form.Group>
			</Row>

		)
	}
}
