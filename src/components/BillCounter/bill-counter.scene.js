import React, { Component, Fragment } from "react"
import { Form, Button, Table, Card, Badge, Row, Col, Alert } from "react-bootstrap"

import BillCounterAmountEditForm from "./bill-counter.amount.edit.form"
import BillCounterNominalEditForm from "./bill-counter.nominal.edit.form"
import UICounter from "../UI/ui.counter"

import { TEST_STATE } from "../../constants/bill-counter"


export default class BillCounterScene extends Component {
	constructor(props) {
		super(props)
		this.state = { amounts: [], nominals: [], selectNominal: null, selectAmount: null }
		// this.state = { ...TEST_STATE }

		this.cbNominalUse = this.cbNominalUse.bind(this)
		this.cbUpdateNominals = this.cbUpdateNominals.bind(this)
		this.cbUpdateNominalCount = this.cbUpdateNominalCount.bind(this)
		this.cbUpdateAmounts = this.cbUpdateAmounts.bind(this)
	}


	cbUpdateAmounts(item) {
		const { amounts } = this.state
		if (Boolean(!item.idx)) {
			let idx = Number(amounts.length + 1)
			let label = String(item.label) === "" ? String("Company").concat(idx) : String(item.label)
			amounts.push({ idx: idx, label: label, amount: Number(item.amount) })
			this.setState({ amounts })
			return
		}
	}

	cbUpdateNominalCount(count, idx) {
		this.setState((state, props) => {
			const { nominals } = state
			nominals.map(item => (Number(idx) === Number(item.idx)) ? { ...item, count: count } : item)
			console.log(nominals)

			return { ...state, nominals: nominals }
		})
	}

	cbUpdateNominals(item, op) {
		const { nominals } = this.state
		switch (op) {
			default:
				return
			case "create":
				nominals.push({ idx: Number(nominals.length + 1), nominal: Number(item.nominal), count: Number(item.count) })
				break
			case "update":
				nominals.map(obj => (obj.idx === item.idx) ? { ...item } : obj)
				break
			case "remove":
				nominals.splice(nominals.indexOf(item.idx), 1)
				break
		}


		this.setState({ nominals })
	}

	sortNominals = (nominals) => {
		return nominals.sort((prev, next) => {
			if (prev.nominal > next.nominal) {
				return -1
			}
			if (prev.nominal < next.nominal) {
				return 1
			}
			return 0
		})
	}
	sortAmounts = (amounts) => {
		return amounts.sort((prev, next) => {
			if (prev.amount > next.amount) {
				return -1
			}
			if (prev.amount < next.amount) {
				return 1
			}
			return 0
		})
	}

	cbNominalUse(nominal) {
		const { nominals } = this.state
		return nominals.some(item => String(item.nominal) === String(nominal));
	}

	nominalsTotal = () => {
		const { nominals } = this.state
		return nominals.reduce((accum, item) => accum + (item.count * item.nominal), 0)
	}
	amountsTotal = () => {
		const { amounts } = this.state
		return amounts.reduce((accum, item) => accum + item.amount, 0)
	}

	renderNominalForm() {
		const { nominals, selectNominal } = this.state
		const nTotal = this.nominalsTotal()
		const aTotal = this.amountsTotal()
		return (

			<Card bg="light" >
				<Card.Header>Наличие купюр и монет</Card.Header>
				<Card.Body className="p-2">
					<BillCounterNominalEditForm
						nominals={nominals}
						cbUpdateNominals={this.cbUpdateNominals}
						cbNominalUse={this.cbNominalUse}
						isEdit={Boolean(selectNominal)}
						nominal={nominals.filter(n => n.idx === selectNominal)}
					/>
				</Card.Body>
				{/* <Card.Footer className={String("text-").concat(aTotal > nTotal ? "danger" : "dark")} > */}
				<Card.Footer >
					<Card.Text className="mt-0 mb-0 text-right">
						<i>Выбрано: <strong>{nTotal}</strong> <small>(доступно: <strong>{(aTotal - nTotal)}</strong>)</small></i>
					</Card.Text>
				</Card.Footer>
			</Card>
		)
	}

	renderAmountsForm() {
		const { amounts, selectAmount } = this.state
		return (
			<Card bg="light">
				<Card.Header>Суммы для распределения</Card.Header>
				<Card.Body className="p-2">
					<BillCounterAmountEditForm
						cbUpdateAmounts={this.cbUpdateAmounts}
						isEdit={Boolean(selectAmount)}
						amount={amounts.filter(a => a.idx === selectAmount)}
					/>
				</Card.Body>
				<Card.Footer>{this.amountsTotal()}</Card.Footer>
			</Card>
		)
	}

	calculate() {
		const { nominals, amounts } = this.state
		let spent = {}
		let rowset = {}
		nominals.forEach((nObj, nKey) => {
			const { count, nominal } = nObj
			const n = Number(nObj.idx)
			console.group("idx:", n, ", nominal:", nominal, ", count:", count)
			let i = 0
			rowset[n] = {}
			while (i < count) {
				// eslint-disable-next-line no-loop-func
				amounts.forEach((aObj, aKey) => {
					const { amount } = aObj
					const a = aObj.idx
					if (!spent[a]) spent[a] = amount
					if (!rowset[n][a]) rowset[n][a] = 0
					// если не помещается купюра в текущий остаток для компании
					if ((spent[a] - nominal) === 0 && (i === count)) return
					if ((spent[a] - nominal) < 0) return
					spent[a] -= nominal
					rowset[n][a]++
					// закончились купюры для номинала
					if (i === count) return
					i++
				})
			}
			return
		})
		return rowset
	}

	render() {
		const { amounts, nominals } = this.state

		const rows = this.calculate()

		return (
			<Fragment>
				<Row>
					<Col className="mt-4">{this.renderNominalForm()}</Col>
					<Col className="mt-4">{this.renderAmountsForm()}</Col>
				</Row>
				<hr />
				<Row>
					<Table size="sm" responsive={true}>
						<thead>
							<tr className="text-center">
								<th>номинал</th><th>eд.<div><small>на сумму</small></div></th>
								{amounts.map((aObj, key) => <th key={key}>{aObj.amount}</th>)}
							</tr>
						</thead>
						<tbody>
							{nominals.map((nObj, nKey) => {
								// const nominalItem = nominals.filter(row => row === row.idx)

								const n = nObj.idx
								const { count, nominal } = nObj
								const nominalTotal = count * nominal
								return (
									<tr key={nKey} className="text-center">
										<th className="text-left" style={{ width: "80px", verticalAlign: "middle" }}>{nominal}</th>
										<td className="text-center" style={{ width: "40px" }}>
											<div><Badge variant="primary">{count}</Badge></div>
											<div><small>{nominalTotal}</small></div>
										</td>

										{amounts.map((aObj, aKey) => {
											const a = aObj.idx
											const cellValue = isNaN(rows[n][a]) ? 0 : rows[n][a]
											return (
												<td key={aKey}>
													<div><Badge variant={!rows[n][a] ? "light" : "success"}>{cellValue}</Badge></div>
													<div><small>{(nominal * cellValue)}</small></div>
												</td>
											)
										})}
									</tr>
								)
							})
							}
						</tbody>
					</Table>
				</Row>
			</Fragment >
		)
	}
}
