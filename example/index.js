import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../src'
import './index.css'

const list = [
  {
    img: require('./assets/images/pexels-photo-210019.jpeg')
  },
  {
    img: require('./assets/images/pexels-photo-593172.jpeg')
  },
  {
    img: require('./assets/images/pexels-photo-210019.jpeg')
  },
  {
    img: require('./assets/images/pexels-photo-593172.jpeg')
  },
  {
    img: require('./assets/images/pexels-photo-210019.jpeg')
  },
]

class App extends React.Component {
  state = {
    type: '',
    checkValue: '1'
  }
  radio1Change = (event) => {
    debugger
    console.log(event)
    this.setState({checkValue: event.target.value})
  }
  radioChange = (event) => {
    console.log(event)
    this.setState({checkValue: event.target.value})
    this.refs.root.setActiveItem(1)
  }
  render () {
    const {checkValue} = this.state
    return (
      <div className="demo1">
        <h1>carousel example1 3D模式</h1>
        <Carousel type="card">
          {list.map((item, index) => (
            <Carousel.Item key={index}>
              <div style={{ height: '100%' }}>
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={index} />
                <h4>{index + 1}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <h1>carousel example2 普通模式</h1>
        <Carousel type={checkValue === '1' ? null : 'card'} ref="root">
          {list.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-wrapper">
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={index} />
                <h4>{index + 1}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <label>
        <input type="radio" name="type" value="1" onChange={(e) => this.radioChange(e)} checked={checkValue === '1'} /> 普通类型
        </label>
        <label>
        <input type="radio" name="type" value="2" onChange={(e) => this.radioChange(e)} checked={checkValue === '2'} /> 卡片类型
        </label>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
if (module.hot) {
  module.hot.accept()
}
