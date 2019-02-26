import React, { PureComponent } from 'react'
import _ from 'lodash'
import axios from 'axios'
import './index.less'

class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    this._getCamelCase('my-camelcase-name')
    console.log('I am login page, componentwillmount!')
  }
  // ... 生命周期函数

  // instans fn
  clickFn() {
    console.log('ele is clicked!')
    this._privateFn()
  }
  getRequist() {
    axios.get('mock/login/index.json').then(res => {
      console.log(res)
    })
  }
  // private fn
  _privateFn() {
    console.log('_private fn is called!')
  }

  _getCamelCase(str) {
    console.log('in login index page : camelCase==', _.camelCase(str))
  }

  render() {
    return (
      <div>
        <h2>this is loginPage!</h2>
        <div className="img-test-less">test less!在less中使用图片！</div>
        <button type="button" onClick={() => this.getRequist()}>发起请求</button>
      </div>
    )
  }
}

export default Login
