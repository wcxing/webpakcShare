import React, { PureComponent } from 'react';
import Tooltip from 'wenzai_ui/lib/tooltip';
// const { Tooltip } = require('wenzai_ui');

console.log(11111, Tooltip)
// import _ from 'lodash'
class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 20
    }
    console.log('constructor', props)
  }
  // componentWillMount() {
  //     this._getCamelCase('my-camelcase-name')
  //     console.log('I am login page, componentwillmount!')
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('home shouldComponentUpdate')
  //   console.log('nextProps', nextProps)
  //   console.log('this.props', this.props)
  //   console.log('nextState', nextState)
  //   console.log('this.state', this.state)
  //   return false
  // }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps_nextProps', nextProps)
    console.log('componentWillReceiveProps_thisProps', this.props)
  }
  _setState() {
    this.setState({
      count: 222
    })
  }
  render() {
    console.log('home render');
    return (
      <div>
        <h2> this is HomePage! </h2>
        <div className="img-test-1">test css!</div>
        <button onClick={ () => { this._setState() } }>son setState</button>
        <div>
          <h3>子组件count{this.state.count}</h3>
          <Tooltip content="文字提示" style={{marginRight:"20px"}}>
            <button>上边文字提示</button>
          </Tooltip>
        </div>
      </div>
    )
  }
}

export default Home
