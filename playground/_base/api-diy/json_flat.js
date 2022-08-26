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
    console.log(findPath(obj, 4))
}

/**
 * {
 *   a: 1,
 *   b: {
 *     c: false,
 *     d: {
 *       e: 2,
 *     },
 *     f: [3],
 *   },
 *   g: [4, 5],
 *   h: [
 *     {i: [6]}
 *   ],
 *   j: null,
 * }
 * 转为:
 * {
 *   "a": 1,
 *   "b.c": false,
 *   "b.d.e": 2,
 *   "b.f[0]": 3
 *   "g[0]": 4,
 *   "g[1]": 5,
 *   "h[0].i[0]": 6,
 *   "j": null,
 * }
 */
function jsonFlat(json) {
    const result = {}

    function flat(obj, currPath) {
        if (typeof obj !== 'object' || obj === null) {
            result[`${currPath}`] = obj;
            return;
        }
        if (Array.isArray(obj)) {
            obj.forEach((e, i) => {
                flat(e, `${currPath}[${i}]`);
            })
            if (obj.length === 0)
                result[currPath] = [];
            return;
        }
        const keys = Object.keys(obj)
        keys.forEach(key => {
            flat(obj[key], currPath === '' ? key : `${currPath}.${key}`);
        })
        if (keys.length === 0 && currPath)
            result[currPath] = {};
    }
    flat(json, '');
    return result;
}
 const obj = {
    a: [],
    m: {},
    b: {
      c: false,
      d: {
        e: 2
      },
      f: [3]
    },
    g: [4, 5, {}],
    h: [
      {i: [6], k: null, l: [], },
    ],
    j: null,
  }

// const res = jsonFlat(obj)
// console.log(res)

/**
{
  a: 1,
  'b.b': 2,
  'b.c': 3,
  'c.d.e': 4,
  'c.d.f': 5,
}
转为
{
  a:1
  b: {
    b: 2,
    c: 3,
  },
  c: {
    d: {
      e: 4,
      f: 5
    }
  }
}
 */
function jsonUnFlattern(obj) {
    const objs = toObjArray(obj);

    function inner(o, next) {
        if (typeof next !== 'object')
            return;
        const entry = Array.from(Object.entries(next))[0];
        if (!entry)
            return
        const key = entry[0];
        const value = entry[1];
        if (typeof value !== 'object') {
            o[key] = value;
            return
        }
        const exist = o[key];
        if (!o[key]) {
            o[key] = value;
            return
        }
        if (typeof exist !== 'object') {
            o[key] = value;
            return
        }
        inner(exist, value);
    }
    const res = {}
    objs.forEach((o) => {
        inner(res, o)
    })
    return res;
}

function toObjArray(obj) {
    const entries = Array.from(Object.entries(obj));
    return entries.map(entry => {
        const keys = entry[0].split('.');
        const value = entry[1];
        return keys.reverse().reduce((obj, key) => {
            return {[key]: obj};
        }, value)
    })
}

const target = {
  a: 1,
  'b.b': 2,
  'b.c': 3,
  'c.d.e': 4,
  'c.d.f': 5,
};

console.log(jsonUnFlattern(target));