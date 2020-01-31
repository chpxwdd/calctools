export const BILL_NOMINALS = [5000, 2000, 1000, 500, 200, 100, 50, 10, 5, 2, 1, 0.5, 0.1, 0.01]

export const ADD_BILL = "bill-counter/ADD_BILL"
export const REMOVE_BILL = "bill-counter/REMOVE_BILL"
export const ADD_SUM = "bill-counter/SET_SUM"
export const REMOVE_SUM = "bill-counter/SET_SUM"

export const TEST_STATE = {
    amounts: [
        {
            idx: 1,
            label: "Company1",
            amount: 87304
        },
        {
            idx: 2,
            label: "Company2",
            amount: 34560
        },
        {
            idx: 3,
            label: "Company3",
            amount: 10550
        }
    ],
    nominals: [
        {
            idx: 1,
            nominal: 5000,
            count: 21
        },
        {
            idx: 2,
            nominal: 2000,
            count: 11
        },
        {
            idx: 3,
            nominal: 1000,
            count: 3
        },
        {
            idx: 4,
            nominal: 500,
            count: 3
        },
        {
            idx: 5,
            nominal: 200,
            count: 3
        },
        {
            idx: 7,
            nominal: 100,
            count: 1
        },
        {
            idx: 6,
            nominal: 50,
            count: 3
        },
        {
            idx: 8,
            nominal: 10,
            count: 6
        },
        {
            idx: 9,
            nominal: 2,
            count: 2
        }
    ],
    selectNominal: null,
    selectAmount: null,
}