// const _ = require('lodash')
import _ from 'lodash'
import './style.css'
import './style.less'
import './assest/font/icomoon/style.css'
import img from './class_01.jpg'

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