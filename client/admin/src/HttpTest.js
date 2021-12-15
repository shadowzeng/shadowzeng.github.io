import React from 'react'

export class HttpTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {foo: 1}
  }
  change() {
    //   fetch('http://localhost:8081/chart.png').then(res => console.log(res))
    fetch('http://localhost:8081/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // mode: 'no-cors',
        body: JSON.stringify({x: 1}),
    }).then(res => {
        debugger
    })
    //   const xhr = new XMLHttpRequest()
    //   xhr.open('get', 'http://localhost:8081/chart.png')
    //   xhr.onload = function() {}
    //   xhr.send()
  }
  render() {
    return (
      <div>
          <button onClick={this.change.bind(this)}>send</button>
          <img src='http://localhost:8081/chart.png' alt='test'></img>
      </div>
    )
  }
}
