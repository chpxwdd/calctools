import React, { Component } from "react"
import { Col, Row, Form, InputGroup } from "react-bootstrap"
import UICounter from '../UI/ui.counter'
// const TYPE_COIN = "coin"
// const TYPE_COUPURE = "coupure"
export default class BillCounterNominalFormItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// type: TYPE_COUPURE,
			denomination: "",
			count: null,
			use: false,
		}

		this.useHandler = this.useHandler.bind(this)
		this.cbUpdateCount = this.cbUpdateCount.bind(this)
	}

	componentDidMount() {
		const { denomination } = this.props
		this.setState({ denomination: denomination, count: null })
	}


	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return !(nextState.count !== this.state.count && nextState.use === this.state.use)
	}

	useHandler(e) {
		const { checked } = e.target
		this.setState({ count: 0, use: Boolean(checked) })
		// this.setState({ use: Boolean(checked) })
	}

	cbUpdateCount(count) {
		console.log("callback cbUpdate", count)
		const { denomination } = this.state
		this.setState({ denomination: denomination, count: count }, () => {
			this.props.cbUpdateItem(denomination, Number(count));
		})
	}

	render() {
		const { count, use, denomination } = this.state
		return (
			<Row >
				<Form.Group className='mb-1' as={Col}>
					<InputGroup key={denomination} size="sm">
						<InputGroup.Prepend>
							<InputGroup.Checkbox onChange={this.useHandler} checked={use} />
						</InputGroup.Prepend>
						<Form.Control value={denomination} disabled />
					</InputGroup>
				</Form.Group>
				<Form.Group className='mb-1' as={Col}>
					<UICounter value={count} cbUpdateCount={this.cbUpdateCount} min={0} max={null} disabled={!use} />
				</Form.Group>
			</Row>
		)
	}
}
