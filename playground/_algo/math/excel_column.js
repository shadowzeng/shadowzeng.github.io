
/**
 * A    1   0*26 + 1
 * B    2   0*26 + 2
 * ...
 * Z   26   0*26 + 26
 * AA  27   1*26 + 1
 * AB  28   1*26 + 2
 * ...
 * AZ  52
 * BA  53   2*26 + 1
 *
 * a0*26^n + a1*26^(n-1) + ... + an*26^0 = num
 * 1 <= ai <= 26
 * 这里需要减去1才能看作是26进制，才可以做整除操作
 * a0*26^n + a1*26^(n-1) + ... + (an - 1) = num - 1
 *
 * (num - 1) % 26 值为 an - 1
 */
function toColumnName(num) {
    const arr = []
    while(num > 0) {
        const yu = (num - 1) % 26
        arr.push(yu)
        num = ((num - 1) - yu) / 26
    }
    return arr.reverse().map(n => String.fromCharCode(n + 'A'.charCodeAt(0))).join('')
}

console.log(toColumnName(53))
