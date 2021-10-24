import React from 'react'

export class Test extends React.Component {
  constructor(props) {
    debugger
    super(props)
    this.state = {id: 0}
    this.onClick = this.onClick.bind(this)
  }

//   static getDerivedStateFromProps(nextProps, prevState) {

//   }

  componentDidMount() {  // 在组建渲染(render)挂载之后
    console.log('did mount')
  }

//   getSnapshotBeforeUpdate() {

//   }

  componentWillUnmount() {

  }

  onClick() {
    this.setState({id: (this.state.id+1)})
  }

  render() {
    console.log('render')
    return (
      <div>
        <div>{this.state.id}</div>
        <button onClick={this.onClick}>Add</button>
      </div>
    )
  }
}