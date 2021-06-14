const {lcs, lcs_array, _windowMaxSubarrayLength, lcs_array2} = require('./lcs')

test('lcs test', () => {
    expect(lcs('abc', 'ac')).toBe(2)
    expect(lcs('a', 'ac')).toBe(1)
    expect(lcs('', 'ac')).toBe(0)
    expect(lcs('ds', '')).toBe(0)
    expect(lcs('', '')).toBe(0)
    expect(lcs('aaa', 'aaa')).toBe(3)
    expect(lcs('cabeda', 'abedea')).toBe(5)
    expect(lcs('ad deks', 'aced5sks')).toBe(4)
})

test('lcs_array test', () => {
    expect(lcs_array('abc', 'ac')).toBe(1)
    expect(lcs_array('abc', '')).toBe(0)
    expect(lcs_array('', 'ac')).toBe(0)
    expect(lcs_array('abcdefg', 'acabcdgabcdemn')).toBe(5)
})

test('window max subarray length', () => {
    expect(_windowMaxSubarrayLength('eabc', 1, 'fbca', 1, 3)).toBe(0)
    expect(_windowMaxSubarrayLength('bacdf', 0, 'eacbf', 0, 5)).toBe(2)
})

test('lcs_array2 test', () => {
    expect(lcs_array2('abc', 'ac')).toBe(1)
    expect(lcs_array2('abc', '')).toBe(0)
    expect(lcs_array2('', 'ac')).toBe(0)
    expect(lcs_array2('abcdefg', 'acabcdgabcdemn')).toBe(5)
})