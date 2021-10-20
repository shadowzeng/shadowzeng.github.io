import React from 'react'

export class Login extends React.Component {
    login() {

    }

    render() {
        return (
            <div>
                <div>
                    <label>用户名</label>
                    <input></input>
                </div>
                <div>
                    <label>密码</label>
                    <input type='password'></input>
                </div>
                <button onClick={this.login}>登录</button>
            </div>
        )
    }
}
