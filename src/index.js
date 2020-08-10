// const _ = require('lodash')
import './style.css'
import './style.less'
import './asset/font/icomoon/style.css'
import img from './class_01.jpg'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

function loadImg(url) {
    var img = document.createElement('img')
    img.src = url
    document.body.appendChild(img)
}

function print(data) {
    console.log(data)
}

const delay = async () => {
    const value = await getRequist()
    console.log(value)
}

function getRequist() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const value = 'new vlaue!'
            resolve(value)
        }, 2000)
    } )
}
// print(123)
// loadImg(img)
// delay()

import Route from './route'

const rootElement = document.getElementById('app')

class TestComponent extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            count: 10,
            obj: {
                name: 'wucx'
            }
        }
    }
    // 生命周期函数
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
      console.log('index componentWillReceiveProps nextProps', nextProps)
      console.log('index componentWillReceiveProps thisProps', this.props)
    }
    _setState() {
      this.setState({
        count: 10,
        obj: Object.assign(this.state.obj, {name: 'liuxin'})
      })
    }
    _dealDOM() {
      var ele = document.getElementById('cur_count')
      ele.innerText = 10
    }
    // shouldComponentUpdate() {
    //   console.log('index shouldComponentUpdate')
    //   return true
    // }
    render() {
        console.log('index render', this.state)
        return (
            <div>
                {/* <button onClick={() => {this._setState()}}>setstate</button>
                <button onClick={() => { this._dealDOM() }}>dealDOM</button>
                <h3>测试react！</h3>
                <div>当前数量：<span id="cur_count">{this.state.count}</span></div>
                <div>当前name：<span id="cur_count">{this.state.obj.name}</span></div>
                <div>当前环境是: {_ENV_}</div> */}
                <Route />
            </div>
        )
    }
}
ReactDOM.render(<TestComponent />, rootElement)
