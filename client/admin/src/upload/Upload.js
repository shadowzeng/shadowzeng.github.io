import React from 'react'

export class Upload extends React.Component {
    render() {
        return (
            <form method='post' action='http://localhost:8011/upload' encType='multipart/form-data'>
                <div>
                    <span>姓名</span>
                    <input name='userName'></input>
                </div>
                <div>
                    <span>头像</span>
                    <input type='file' name='userAvatar'></input>
                </div>
                <button type='submit'>ok</button>
            </form>
        )
    }
}
