/**
 * 最大子序和 (Q53)
 */

function maxSubArray(nums) {
    let finalMax = -Infinity
    let currMax = -Infinity
    let currSum = 0
    for (let i = 0; i < nums.length; i++) {
        currMax = Math.max(nums[i], currSum + nums[i])
        if (currSum + nums[i] > 0)
            currSum += nums[i]
        else
            currSum = 0
        finalMax = Math.max(finalMax, currMax)
    }
    return finalMax
}