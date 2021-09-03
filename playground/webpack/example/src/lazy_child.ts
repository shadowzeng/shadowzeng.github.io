import {cloneDeep} from 'lodash'

const a = {
    foo: 'foo',
    bar: [1],
    fn: () => {
        console.log('hello')
    }
}
const b = cloneDeep(a)

console.log(a.bar === b.bar)

export const foo = 'test'
