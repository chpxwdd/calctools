import React, { Component, Fragment } from "react"
import { Form, Row, Col, Alert } from "react-bootstrap"

import BillCounterAmountEditForm from "./bill-counter.amount.edit.form"
import BillCounterNominalEditForm from "./bill-counter.nominal.edit.form"
import BillCounterGrid from "./bill-counter.grid"
import { calculateSum } from "../../utils/bill-counter"

export default class BillCounterScene extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amounts: [],
			nominals: [],
			selectNominal: null,
			selectAmount: null,
		}

		this.cbNominalUse = this.cbNominalUse.bind(this)
		this.cbUpdateNominals = this.cbUpdateNominals.bind(this)
		this.cbUpdateAmounts = this.cbUpdateAmounts.bind(this)
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// const { nominals, amounts } = this.state
	// console.group("shouldComponentUpdate ")
	// console.log(" nextState ", nextState)
	// console.log(" state ", this.state)
	// console.log(" nextProps ", nextProps)
	// console.log(" props ", this.props)
	// console.groupEnd()
	// return false
	// }

	// componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(props, state) {
		console.log(this.state)
	}

	cbUpdateAmounts(item) {
		const { amounts } = this.state

		// add amount
		if (Boolean(!item.idx)) {
			let idx = Number(amounts.length + 1)
			let label = String(item.label) === "" ? String("Company").concat(idx) : String(item.label)
			amounts.push({
				idx: idx,
				label: label,
				amount: Number(item.amount)
			})
			this.setState({ amounts })
			return
		}
		// upd amount
		// remove amount
	}

	cbUpdateNominals(item) {
		const { nominals } = this.state
		// add nominal
		if (Boolean(!item.idx)) {
			nominals.push({ idx: Number(nominals.length + 1), nominal: Number(item.nominal), count: Number(item.count) })
			this.setState({ nominals })
			return
		}

		// update nominal
		// remove nominal


	}

	cbNominalUse(nominal) {
		const { nominals } = this.state
		return nominals.some(item => String(item.nominal) === String(nominal));
	}

	render() {
		const { amounts, nominals, selectNominal, selectAmount } = this.state
		return (
			<Fragment>
				<Form>
					<BillCounterNominalEditForm
						cbUpdateNominals={this.cbUpdateNominals}
						nominals={nominals}
						cbNominalUse={this.cbNominalUse}
					// isEdit={Boolean(selectNominal)} nominal={nominal.filter(n => n.idx === selectNominal)} 
					/>
					<BillCounterAmountEditForm
						cbUpdateAmounts={this.cbUpdateAmounts}
					// isEdit={Boolean(selectAmount)} amount={amounts.filter(a => a.idx === selectAmount)} 
					/>
					<hr />
					<Alert size="sm" variant="primary">Total: <strong>{calculateSum(amounts)}</strong></Alert>
				</Form>
				<hr />
				<BillCounterGrid amounts={amounts} nominals={nominals}></BillCounterGrid>
				{/* {amounts.length > 0 && <BillCounterGrid amounts={amounts} nominals={nominals}></BillCounterGrid>} */}

			</Fragment >

		)
	}

}
