import { Component } from 'react'
import './App.scss'

class App extends Component {
  public shashank = this.props

  constructor(props: { [key: string]: any }) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  incrementCount = () => {
    this.setState((prevState: { [p: string]: number }) => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    const { count }: { [p: string]: number } = this.state

    return (
      <div>
        <h1>Hello, React with Class Component!</h1>
        <p>Count: {count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    )
  }
}

export default App
