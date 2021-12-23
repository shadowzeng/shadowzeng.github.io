function isValidBracket(str) {
    const stack = []

    const starts = ['{', '[', '(']
    const weights = {'{': 1, '[': 2, '(': 3}
    for (let i = 0; i < str.length; i++) {
        if (starts.includes(str[i])) {
            if (stack.length === 0)
                stack.push(str[i])
            else {
                const top = stack[stack.length - 1]
                if (starts.includes(top) && weights[top] > weights[str[i]])
                    return false
                else
                    stack.push(str[i])
            }
            continue
        }
        if (stack.length === 0)
            return false
        if (str[i] === ')' && stack[stack.length - 1] === '(')
            stack.pop()
        else if (str[i] === ']' && stack[stack.length - 1] === '[')
            stack.pop()
        else if (str[i] === '}' && stack[stack.length - 1] === '{')
            stack.pop()
        else
            return false
    }
    return stack.length === 0
}
console.log(isValidBracket('(){[({})]}[()]'))
