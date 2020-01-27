export const sortByNominals = (nominals) => { }

export const calculateSum = (amounts) => {
    return amounts.reduce((accum, item) => accum + Number(item.amount), 0)
}
