import React, { Component, Fragment } from "react"
import { Form, Button, Table, Card, Badge, Row, Col, Alert } from "react-bootstrap"

import BillCounterAmountEditForm from "./bill-counter.amount.edit.form"
import BillCounterNominalEditForm from "./bill-counter.nominal.edit.form"
import UICounter from "./ui.counter"

import { TEST_STATE } from "../../constants/bill-counter"


export default class BillCounterScene extends Component {
	constructor(props) {
		super(props)
		// this.state = {amounts: [],nominals: [],selectNominal: null,selectAmount: null}
		this.state = { ...TEST_STATE }

		this.cbNominalUse = this.cbNominalUse.bind(this)
		this.cbUpdateNominals = this.cbUpdateNominals.bind(this)
		this.cbUpdateNominalCount = this.cbUpdateNominalCount.bind(this)
		this.cbUpdateAmounts = this.cbUpdateAmounts.bind(this)
	}

	componentWillUpdate(nextProps, nextState) {
		console.log(nextState)

	}

	// shouldComponentUpdate(prevProps, prevState) {
	// 	return false
	// }
	cbUpdateAmounts(item) {
		const { amounts } = this.state

		// add amount
		if (Boolean(!item.idx)) {
			let idx = Number(amounts.length + 1)
			let label = String(item.label) === "" ? String("Company").concat(idx) : String(item.label)
			amounts.push({ idx: idx, label: label, amount: Number(item.amount) })
			this.setState({ amounts })
			return
		}
		// upd amount
		// remove amount
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

		nominals.sort((prev, next) => {
			if (prev.nominal > next.nominal) {
				return -1
			}
			if (prev.nominal < next.nominal) {
				return 1
			}
			return 0
		})

		this.setState({ nominals })
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
					<BillCounterAmountEditForm cbUpdateAmounts={this.cbUpdateAmounts} isEdit={Boolean(selectAmount)} amount={amounts.filter(a => a.idx === selectAmount)} />
				</Card.Body>
				<Card.Footer>{this.amountsTotal()}</Card.Footer>
			</Card>
		)
	}


	calculate = () => {
		const { nominals, amounts } = this.state
		const countAmountItems = amounts.length

		// const nominalIndexes = Array.from(amounts, a =>  a.idx)
		const aIds = Array.from(amounts, a => a.idx)
		let totals = Array.from(amounts, a => a.amount)

		let res = {}
		let checkCompanyAmounts = {}
		nominals.forEach((n, key) => {
			console.group("Номинал -", n.nominal, " [", n.count, " шт.]")
			if (!res[n.nominal]) {
				res[n.nominal] = {}
			}

			let countDiff = n.count

			for (let i = 1; i <= n.count; i++) {


				// eslint-disable-next-line no-loop-func
				amounts.forEach((a, key) => {

					if (!checkCompanyAmounts[a.label]) {
						checkCompanyAmounts[a.label] = a.amount
						console.log("Создан обьект проверки суммы для компании " + a.label)
					}

					if (!res[n.nominal][a.label]) {
						console.log("Сoздаем набор купюр номиналом " + n.nominal + " для компании " + a.label)
						res[n.nominal][a.label] = 0
					}

					if (i < n.count) {
						res[n.nominal][a.label]++
						i++
						countDiff = countDiff - 1


						console.log("Для номинала ", n.nominal, " осталось ", countDiff)

					}


				})

				// даем каждому Amount  по одной проверяя перед этим 
				// 1. не превысим ли мы сумму для компании

			}
			console.log(checkCompanyAmounts)
			console.log(res[n.nominal])
			console.groupEnd()

		})

		console.log("res", res)
		return res
	}

	render() {
		this.calculate()
		const { amounts, nominals } = this.state
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
								<th colSpan="2"><small>&nbsp;</small><br /><strong>&nbsp;</strong></th>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{nominals.map((item, key) => {
								const { idx, nominal, count } = item
								return (
									<tr key={key} className="text-center">
										<td className="text-right" style={{ width: "60px" }}>{nominal}</td>
										<td style={{ width: "120px" }}><Badge variant="primary">{count}</Badge></td>
										<td>&nbsp;</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</Row>
			</Fragment>

		)
	}

}
