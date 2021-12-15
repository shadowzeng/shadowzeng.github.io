/** 是否是当月的最后一天 */

function isLastDay(date) {
    return new Date(date.getTime() + 24 * 60 * 60 * 1000).getDate() === 1
}

function isLastDay2(date) {
    const tempDate = new Date(date)
    tempDate.setMonth(date.getMonth() + 1)
    tempDate.setDate(0)
    return date.getMonth() === tempDate.getMonth() &&
        date.getDate() === tempDate.getDate()
}

console.log(isLastDay(new Date('2021-02-27')))
