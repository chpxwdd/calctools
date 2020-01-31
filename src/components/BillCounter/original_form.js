import React, { Component } from "react"
import { Form, InputGroup, Button, Row, Col, ButtonGroup } from "react-bootstrap"
import { BILL_NOMINALS } from "../../constants/bill-counter.js"
export default class BillCounterCompanyFormItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			addSum: null,
			addOrg: null,
			bills: {},
			sums: {},
		}

		/** Sum Form */
		this.changeSumHandler = this.changeSumHandler.bind(this)
		this.changeOrgHandler = this.changeOrgHandler.bind(this)
		this.createSumItemHandler = this.createSumItemHandler.bind(this)
		this.removeSumItemHandler = this.removeSumItemHandler.bind(this)
		this.updateSumItemHandler = this.updateSumItemHandler.bind(this)
		this.checkboxSumHandler = this.checkboxSumHandler.bind(this)

		/** Sum Form */
		this.checkboxBillHandler = this.checkboxBillHandler.bind(this)
		this.changeBillHandler = this.changeBillHandler.bind(this)

		/** SUBMITING FORM*/
		this.submitHandler = this.submitHandler.bind(this)
	}

	/** BILL FORM-GROUP HANDLERS */
	checkboxBillHandler(e, bill) {
		const { checked } = e.target
		const { bills } = this.state
		if (checked) {
			bills[String(bill)] = null
		} else {
			delete bills[String(bill)]
		}
		this.setState({ bills: bills })
	}

	changeBillHandler(e, bill) {
		const { bills } = this.state
		const { value } = e.target
		// const bill = Number(dataset['bill'])

		bills[bill] = value
		this.setState({ bills: bills })
	}

	/** SUM FORM-GROUP HANDLERS */
	changeSumHandler(e) {
		const { value } = e.target
		this.setState({ addSum: value })
	}

	changeOrgHandler(e) {
		const { value } = e.target
		this.setState({ addOrg: value })
	}

	checkboxSumHandler(e, idx) {
		const { checked } = e.target
		const { sums } = this.state

		sums[Number(idx)].use = checked
		this.setState({ sums })
	}

	createSumItemHandler(e) {
		const { sums, addOrg, addSum } = this.state
		/**  @todo add check containst ORG NAME*/
		sums[Object.keys(sums).length + 1] = { org: addOrg, sum: addSum, use: true }
		this.setState({
			sums,
			addSum: null,
			addOrg: null,
		})
	}

	updateSumItemHandler(e, idx) {
		console.log("updateSumItemHandler", e, idx)
	}

	removeSumItemHandler(e, idx) {
		const { sums } = this.state
		delete sums[idx]
		this.setState({ sums: sums })
	}

	/** SUBMIT HANDLER */
	submitHandler(e) {
		const { sums, bills } = this.state
		this.getCalculationValues(sums, bills)
	}

	/** RENDERING */
	/** */
	renderAddSumInputGroup() {
		const { addSum, addOrg } = this.state
		return (
			<InputGroup className="mb-1" size="sm">
				{/* SUM VALUE */}
				<Form.Control
					type="text"
					placeholder="Организация"
					value={!addOrg ? "" : String(addOrg)}
					onChange={this.changeOrgHandler}
				/>
				<Form.Control
					type="text"
					placeholder="Сумма"
					value={!addSum || isNaN(addSum) ? "" : Number(addSum)}
					onChange={this.changeSumHandler}
				/>
				<InputGroup.Append>
					<Button onClick={this.createSumItemHandler} disabled={!(addSum && addOrg)}>
						<i className="fas fa-plus" />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		)
	}

	/**  */
	renderBillItem(bill, key) {
		const { bills } = this.state
		return (
			<InputGroup key={key} className="mb-1" size="sm">
				<InputGroup.Prepend>
					{/* CHECKBOX */}
					<InputGroup.Checkbox
						name={"billCheckbox" + bill}
						onChange={e => this.checkboxBillHandler(e, bill)}
						checked={bills.hasOwnProperty(bill)}
					/>
					{/* LABEL VALUE */}
					<InputGroup.Text>
						<div style={{ width: "30px", fontWeight: 600, texAlign: "right" }}>{bill}</div>
					</InputGroup.Text>
				</InputGroup.Prepend>
				{/* COUNT DENOMINATION VALUE */}
				<Form.Control
					name={"billInput-" + bill}
					// value={bills[bill] ? bills[bill] : ""}
					value={bills[bill]}
					onChange={e => this.changeBillHandler(e, bill)}
					disabled={!bills.hasOwnProperty(bill)}
				/>
			</InputGroup>
		)
	}

	renderSumItem(idx, key) {
		const { sums } = this.state
		if (sums.lenght == 0) {
			return
		}
		const { org, sum, use } = sums[idx]
		return (
			<InputGroup key={key} className="mb-1" size="sm">
				{/* SUM VALUE */}
				<InputGroup.Prepend>
					<InputGroup.Checkbox
						title="Исключить из расчета"
						name={"sumCheckbox" + idx}
						// data-idx={idx}
						onChange={e => this.checkboxSumHandler(e, idx)}
						checked={use}
					/>
				</InputGroup.Prepend>

				<Form.Control type="text" value={org} disabled />
				<Form.Control type="text" value={sum} disabled />

				<InputGroup.Append>
					{/* <Button
                        title="Редактировать позицию"
                        variant="primary"
                        onClick={(e) => this.removeSumItemHandler(e, idx)}
                        disabled={!use}
                    >
                        <i className="fas fa-save" />
                    </Button> */}
					<Button
						title="Редактировать позицию"
						variant={use ? "danger" : "secondary"}
						onClick={e => this.removeSumItemHandler(e, idx)}
						disabled={!use}
					>
						<i className="fas fa-trash" />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		)
	}

	/** */
	render() {
		const { sums, bills } = this.state
		return (
			<Form>
				<h5>Суммы для расчета</h5>
				{Object.keys(sums).map((idx, key) => this.renderSumItem(idx, key))}
				<hr />
				{this.renderAddSumInputGroup()}
				<hr />
				<h5>Номиналы</h5>
				{BILL_NOMINALS.map((value, key) => this.renderBillItem(value, key))}
				{/* <hr />
				<div className="pull-right">
					<ButtonGroup size="sm" style={{ width: "100%" }}>
						<Button variant="danger" disabled={!sums.length || !bills.length} style={{ width: "20px" }}>
							<i className="fa fa-ban" />
						</Button>
						<Button
							as="button"
							variant={Object.keys(sums).length && Object.keys(bills).length ? "success" : "light"}
							disabled={!Object.keys(sums).length && !Object.keys(bills).length}
							onClick={() => this.props.setOptions(sums, bills)}
						>
							Распределить
						</Button>
					</ButtonGroup>
				</div> */}
			</Form>
		)
	}
}
