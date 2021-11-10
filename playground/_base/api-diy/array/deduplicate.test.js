import {deduplicate, deduplicate2, deduplicate3} from './deduplicate'

test('test', () => {
    const obj = {y: 1}
    const arr = [1, null, 2, undefined, 1, null, 2, false, 3, '4', undefined, false, {x: 1}, obj, {x: 1}, obj]
    console.log(deduplicate3(arr))
    expect(deduplicate3(arr).length).toBe(10)
    // expect(deduplicate(arr)).toEqual([1,2,3,'4', null, false, {x: 1}, {x: 1}, {y: 1}])
})
