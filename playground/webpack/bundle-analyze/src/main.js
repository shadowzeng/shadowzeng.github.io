import {cloneDeep} from 'lodash'
import Foo from './bar'

const foo = new Foo()
const res = foo[Math.random() > 0.5 ? 'foo' : 'bar']()
console.log(res)
console.log(cloneDeep({}))
