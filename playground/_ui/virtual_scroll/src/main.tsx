import React from 'react';
import ReactDOM from 'react-dom';
import {VirtualScroll} from './demo'

const App = () => {
    const items = Array(10000).fill(undefined).map((e, index) => {
        return {id: index, name: `选项${index}`}
    })
    return <VirtualScroll items={items} />
}

ReactDOM.render(<App />, document.getElementById('root'));