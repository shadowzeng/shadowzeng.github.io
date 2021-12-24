import React from 'react'

export class Debug extends React.Component {
  constructor(props) {
    super(props)
    this.state = {foo: 1}
  }
  change() {
    this.setState({foo: (this.state.foo + 1)})
  }
  render() {
    return (
      <div>
          <button onClick={this.change.bind(this)}>修改foo</button>
          <Foo foo={this.state.foo}></Foo>
      </div>
    )
  }
}

/**
 * 挂载时                   |  更新时                  |  卸载时
 * constructor             |                         |
 * getDerivedStateFromProps| getDerivedStateFromProps|
 *                         | shouldComponentUpdate   |
 * render                  | render                  |
 *                         | getSnapshotBeforeUpdate |
 * (update real DOM)       | (update real DOM)       |
 * componentDidMount       | ComponentDidUpdate      | componentWillUnmount
 */
class Foo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {id: 0, label: 'test'}
    this.onClick = this.onClick.bind(this)
  }

  /**
   * 作用是在props变化时, 可以在这里根据新的props(和之前的state)来修改当前state
   * 使用静态方法是为了避免调用this, 这里需要是纯函数, 直接返回期望的新state
   * 返回null表示 props 变化不影响新state
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps()')
    return null
  }

  /**
   * 返回true则更新当前组件和子组件(子组件中有该钩子的话会做同样判断)
   * 返回false则不会更新当前组件及其子组件
   * 可以用来优化性能
   * 调用forceUpdate()则会强制更新, 忽略该钩子
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate()')
    return true
  }

  componentDidMount() {  // 在组建渲染(render)挂载之后
    console.log('componentDidMount()')
  }

  /**
   * 在更新实际DOM之前调用
   * 该方法单独使用不起作用, 需与componentDidUpdate结合使用
   * 其返回值会作为componentDidUpdate的第三个参数
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate()')
    return null
  }

  /* 在更新实际DOM和refs之后调用 */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate()')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount()')
  }

  onClick() {
    this.setState({id: (this.state.id+1)})
  }

  /**
   * 后代组件抛出错误, 会调用该方法
   */
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError');
    return { hasError: true };
  }

  /**
   * 后代组件抛出错误也会调用该方法, 会多提供一个info参数, 其中包含了错误的更多信息
   * 该方法允许包含产生副作用的代码
   */
  componentDidCatch(error, info) {
    console.log('componentDidCatch');
  }

  render() {
    console.log('render()')
    return (
      <div>
        <div>{this.props.foo}</div>
        <div>{this.state.id}</div>
        <button onClick={this.onClick}>Add</button>
      </div>
    )
  }
}
