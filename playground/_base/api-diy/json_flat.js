/**
 * obj = {
 *   a: 1,
 *   b: {
 *     c: 2,
 *     d: {e: 3},
 *   },
 *   f: {g: 4},
 * }
 * findPath(obj, 3)返回[a,d,e]
 */
function findPath(obj, target) {
    let result = []
    for (let key in obj) {
        const value = obj[key]
        result.push(key)
        if (value === target)
            break
        else if (typeof value === 'object') {
            const childPath = findPath(value, target)
            if (childPath.length)
                result = result.concat(childPath)
            else
                result.pop(key)
        } else {
            result.pop(key)
        }
    }
    return result
}

// testFindPath()

function testFindPath() {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {e: 3},
      },
      f: {g: 4},
    }
    console.log(findPath(obj, 5))
}

/**
 * {
 *   a: 1,
 *   b: {
 *     c: false,
 *     d: {
 *       e: 2
 *     },
 *     f: [3]
 *   },
 *   g: [4, 5]
 *   h: [
 *     {i: [6]}
 *   ]
 * }
 * 转为:
 * {
 *   "a": 1,
 *   "b.c": false,
 *   "b.d.e": 2,
 *   "b.f[0]": 3
 *   "g[0]": 3,
 *   "g[1]": 4,
 *   "h[0].g[0]": 5,
 * }
 */
function jsonFlat(json) {
    const result = {}

    function flat(obj, currPath) {
        for (let key in obj) {
            const value = obj[key]
            if (typeof value !== 'object') {
                result[currPath + key] = obj[key]
            }
            else if (Array.isArray(value)) {
                value.forEach((e, i) => {
                    flat(e, currPath+`[${i}]`)
                })
            }
        }
        Object.keys(obj).forEach(key => {
            result[key]
        })
    }
}