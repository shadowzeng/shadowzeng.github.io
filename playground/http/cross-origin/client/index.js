
document.getElementById('get').addEventListener('click', () => {
    fetch('http://localhost:4321/user/get', {
        credentials: 'include',
    }).then(res => {
        console.log(res)
    })
})

document.getElementById('post').addEventListener('click', () => {
    fetch('http://localhost:4321/user/post', {
        method: 'POST'
    }).then(res => {
        console.log(res)
    })
})

document.getElementById('get-preflight').addEventListener('click', () => {
    fetch('http://localhost:4321/user/get', {
        // headers: {'myHeader': 'test'} // 会触发 options 预检请求
        headers: {
            'Content-Type': 'application/json', // 会触发预检
            // 'Content-Type': 'text/plain',  // 不会触发预检
        },
    }).then(res => {
        console.log(res)
    })
})

document.getElementById('post-preflight').addEventListener('click', () => {
    fetch('http://localhost:4321/user/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 会触发预检
        },
        // body: {},
    }).then(res => {
        console.log(res)
    })
})