import React from 'react'

export class Register extends React.Component {
    constructor() {
        super()
        this.state = {name: ''}
    }

    changeName(event) {
        this.setState({name: event.target.value})
    }

    save() {
        const user = {name: this.state.name}
        fetch('http://localhost:3000/api/save', {
            method: 'POST',
            body: JSON.stringify(user)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <label>用户名</label>
                    <input value={this.state.name} onChange={this.changeName.bind(this)}></input>
                </div>
                <button onClick={this.save.bind(this)}>保存</button>
            </div>
        )
    }
}
