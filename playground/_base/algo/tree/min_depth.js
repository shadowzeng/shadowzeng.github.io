/**
 * 二叉树最小深度 Q(111)
 */

function minDepth(root) {
    if (!root)
        return 0
    if (!root.right)
        return 1 + minDepth(root.left)
    if (!root.left)
        return 1 + minDepth(root.right)
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
}

/**
 * 层次遍历
 */
function minDepth2(root) {
    if (!root)
        return 0
    const nodes = [root]
    let level = 1
    while (nodes.length) {
        const size = nodes.length
        for (let i = 0; i < size; i++) {
            const node = nodes.shift()
            if (!node.left && !node.right)
                return level
            node.left && nodes.push(node.left)
            node.right && nodes.push(node.right)
        }
        level ++
    }
    return level
}