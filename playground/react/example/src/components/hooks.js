import {useState} from 'react'

export function HooksSample() {
    return (
        <div>
            <Count></Count>
            <hr></hr>
            <Count></Count>
        </div>
    )
}

function Count() {
    debugger
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
