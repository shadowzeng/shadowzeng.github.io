import {cloneDeep} from 'lodash'
import Bar from './bar'
import {foo} from './foo'

const bar = new Bar()
const res = bar[Math.random() > 0.5 ? 'foo' : 'bar']()
console.log(res)
console.log(cloneDeep({}))
console.log(foo)
// import('lodash').then(mod => {
//     console.log(mod)
// })
