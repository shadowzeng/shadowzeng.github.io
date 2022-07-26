const data = [
    {id: '1'},
    {id: '2', children: [{id: '3'}, {id: '4'}]},
    {
        id: '5',
        children: [
            {id: '6', children: [{id: '7'}]},
            {id: '8', children: [{id: '9'}, {id: '10'}]},
        ]
    },
]

function findPath(nodes, fn) {
    const path = []

    let find = false
    const traverse = (node) => {
        if (find)
            return
        if (!node.children) {
            if(fn(node)) {
                path.push(node)
                find = true
            }
            return
        }
        path.push(node)
        node.children.forEach(n => {
            traverse(n)
        })
        if(!find) path.pop()
    }
    nodes.forEach(node => {
        traverse(node)
    })
    return path
}

const path = findPath(data, (node) => node.id === '9')
console.log(path.map(p => p.id))