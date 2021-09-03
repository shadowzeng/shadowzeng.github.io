import {times} from 'lodash'

// import './style.scss'

interface User {
    id: number
    name: string
}

function test(user: User): void {
    console.log(user.name)
}

test({id: 1, name: 'hello'})

times(5, e => {
    console.log(e)
})

export function lazyLoad(): void {
    import('./lazy_child').then(mod => {
        console.log(mod)
    })
}
