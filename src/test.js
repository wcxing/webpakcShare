// const _ = require('lodash')
import _ from 'lodash'
import './style.css'
import './style.less'
import './assest/font/icomoon/style.css'
import img from './class_01.jpg'
import React from 'react'
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
print(123)
loadImg(img)
delay()
console.log(111)

const rootElement = document.getElementById('app')

class TestComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 10
        }
    }
    // 生命周期函数
    componentWillMount() {
    }
    render() {
        return (
            <div>
                <h3>测试react！</h3>
                <div>当前数量：{this.state.count}</div>
            </div>
        )
    }
}
ReactDOM.render(<TestComponent />, rootElement)