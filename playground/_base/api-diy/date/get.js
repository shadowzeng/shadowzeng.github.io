function getPreviousQuarter(date) {
    const target = new Date(date)
    target.setMonth(date.getMonth() - 2)
    target.setDate(0)  // 设置日为0会将日期设置为上一个月最后一天
    return target
}

// console.log(getPreviousQuarter(new Date('2022-12-31')))

function getPreviouseHalfYear(date) {
    const target = new Date(date)
    target.setMonth(date.getMonth() - 5)
    target.setDate(0)
    return target
}

console.log(getPreviouseHalfYear(new Date('2022-06-30')))
