import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'

const App = () => {
    return (
        <div>
            <div className='app-head'>Hello Esbuild</div>
        </div>
    )
}

const root = document.createElement('div')
root.className = 'root'
document.body.appendChild(root)

ReactDOM.render(<App></App>, root)
