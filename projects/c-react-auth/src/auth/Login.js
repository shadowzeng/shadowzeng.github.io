import React from 'react'

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.usernameInput = React.createRef()
        this.passwordInput = React.createRef()

        // 需要进行如下绑定, 否则执行到 login 方法中时 this 是 undefined
        this.login = this.login.bind(this)
    }

    login() {
        const username = this.usernameInput.current.value
        const password = this.passwordInput.current.value
        console.log(username)
        console.log(password)
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
        }).catch(e => console.log(e))
    }

    render() {
        return (
            <div>
                <div>
                    <label>用户名</label>
                    <input ref={this.usernameInput}></input>
                </div>
                <div>
                    <label>密码</label>
                    <input type='password' ref={this.passwordInput}></input>
                </div>
                <button onClick={this.login}>登录</button>
            </div>
        )
    }
}
