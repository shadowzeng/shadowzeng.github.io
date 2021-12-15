/**
 * 两数之和(Q1)
 */

/**
 * 返回一对数组下标, 顺序随意
 * Time: O(n)
 * Space: O(n)
 */
function twoSum(nums, target) {
    const hash = {}
    for (let i = 0; i < nums.length; i++) {
        if (hash[nums[i]] !== undefined)
            return [hash[nums[i]], i]
        hash[target - nums[i]] = i
    }
    return []
}

console.log(twoSum([2,7,11,15], 9))
