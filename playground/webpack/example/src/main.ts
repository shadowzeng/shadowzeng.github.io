import './style.scss'

interface User {
    id: number
    name: string
}

function test(user: User): void {
    console.log(user.name)
}

test({id: 1, name: 'hello'})

