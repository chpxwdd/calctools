import { BILL_NOMINALS, ADD_BILL, REMOVE_BILL, ADD_SUM, REMOVE_SUM } from "../constants/bill-counter.js"

const initialState = {
	bills: {},
	sums: { 1: { org: "Company1", sum: null, use: true } },
}

export default function billCounter(state = initialState, { type, payload }) {
	switch (type) {
		case ADD_SUM:
			return {
				...state,
				header: payload,
			}

		case REMOVE_SUM:
			return {
				...state,
				header: payload,
			}

		case ADD_BILL:
			return {
				...state,
				header: payload,
			}

		case REMOVE_BILL:
			return {
				...state,
				header: payload,
			}

		default:
			return state
	}
}
