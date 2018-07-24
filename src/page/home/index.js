import React, { PureComponent } from 'react'
// import _ from 'lodash'
class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  // componentWillMount() {
  //     this._getCamelCase('my-camelcase-name')
  //     console.log('I am login page, componentwillmount!')
  // }

  render() {
    return (
      <div>
        <h2> this is HomePage! </h2>
        <div className="img-test-1">test css!</div>
      </div>
    )
  }
}

export default Home
