/**
 * 二叉树路径总和(Q112)
 */

/**
 * 层次遍历过程中累加和
 */
function hasPathSUm(root, targetSum) {
    if (!root)
        return false
    const nodes = [root]
    const vals = [root.val]
    while (nodes.length) {
        const size = nodes.length
        for (let i = 0; i < size; i++) {
            const node = nodes.shift()
            const val = vals.shift()
            if (!node.left && !node.right && val === targetSum)
                return true
            if (node.left) {
                nodes.push(node.left)
                vals.push(val + node.left.val)
            }
            if (node.right) {
                nodes.push(node.right)
                vals.push(val + node.right.val)
            }
        }
    }
    return false
}

/**
 * 递归
 */
function hasPathSUm2(root, targetSum) {
    if (!root)
        return false
    if (!root.left && !root.right)
        return targetSum === root.val
    return hasPathSUm2(root.left, targetSum - root.val) ||
        hasPathSUm2(root.right, targetSum - root.val)
}