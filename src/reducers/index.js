import { combineReducers } from "redux"
import page from "./page"
import billCounter from "./bill-counter"

export const rootReducer = combineReducers({ page, billCounter })
