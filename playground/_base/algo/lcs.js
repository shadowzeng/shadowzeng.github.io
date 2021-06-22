/**
 *  Longest Common Subsequence
 */
module.exports.lcs = (t1, t2) => {
    if (t1.length === 0 || t2.length === 0)
        return 0
    // 生成 t1.length + 1 行  t2.length + 1 列的二维数据
    const res = Array(t1.length + 1).fill(0).map(() => Array(t2.length + 1).fill(0))
    for (let i = 1; i <= t1.length; i++) {
        for (let j = 1; j <= t2.length; j++) {
            if (t1[i-1] === t2[j-1]) {
                res[i][j] = res[i-1][j-1] + 1
            }
            else {
                res[i][j] = Math.max(res[i-1][j], res[i][j-1])
            }
        }
    }
    return res[t1.length][t2.length]
}

/**
 *  Longest Common Subarray
 */
module.exports.lcs_array = (t1, t2) => {
    if (t1.length === 0 || t2.length === 0)
        return 0
    // 生成 t1.length + 1 行  t2.length + 1 列的二维数据
    const res = Array(t1.length + 1).fill(0).map(() => Array(t2.length + 1).fill(0))
    let max = 0
    for (let i = t1.length - 1; i >= 0; i--) {
        for (let j = t2.length - 1; j >= 0; j--) {
            // res[i][j] 表示t1[i:]和t2[j:]的最长公共前缀长度, ab和cab的最长公共前缀为0
            res[i][j] = t1[i] === t2[j] ? res[i + 1][j + 1] + 1 : 0
            max = Math.max(max, res[i][j])
        }
    }
    return max // 注意 res[0][0] 不是最终的结果
}

module.exports.lcs_array = (t1, t2) => {
    const res = Array(t1.length + 1).fill(0).map(() => Array(t2.length + 1).fill(0))
    let max = 0
    for (let i = 0; i < t1.length; i++) {
        for (let j = 0; j < t2.length; j++) {
            res[i + 1][j + 1] = t1[i] === t2[j] ? res[i][j] + 1 : 0
            max = Math.max(max, res[i + 1][j + 1])
        }
    }
    return max
}


// sliding window
module.exports.lcs_array3 = (t1, t2) => {
    let res = 0
    /**
     * 两数组左边对齐，t1为基准，t2向右移动
     */
    for (let i = 0; i < t1.length; i++) {
        const minLength = Math.min(t2.length, t1.length - i)
        const max = this._windowMaxSubarrayLength(t1, i, t2, 0, minLength )
        res = Math.max(max, res)
    }
    /**
     * t2为基准，t1向右移动
     */
    for (let i = 0; i < t2.length; i++) {
        const minLength = Math.min(t1.length, t2.length - i)
        const max = this._windowMaxSubarrayLength(t1, 0, t2, i, minLength )
        res = Math.max(max, res)
    }
    return res
}

/**
 * 当前窗口下两个子数组（字符串）中最长子串(下标对齐）的长度
 */
module.exports._windowMaxSubarrayLength = (a1, start1, a2, start2, length) => {
    let finalMax = 0
    let currMax = 0
    for (let i = 0; i < length; i++) {
        if (a1[start1 + i] !== a2[start2 + i]) {
            finalMax = Math.max(finalMax, currMax)
            currMax = 0
        } else {
            currMax += 1
        }
    }
    return finalMax
}