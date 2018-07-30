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
        <br />
        <br />
        <br />
        <br />
        <h1>carousel example2 普通模式</h1>
        <Carousel type={checkValue === '1' ? null : 'card'} 
        ref="root">
          {list.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-wrapper">
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={index} />
                <h4>{index + 1}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <br />
        <br />
        <br />
        <br />
        <h1>carousel example3 自动播放</h1>
        <Carousel type={checkValue === '1' ? null : 'card'} 
        autoplay={true}
        ref="root">
          {list.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-wrapper">
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={index} />
                <h4>{index + 1}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <br />
        <br />
        <br />
        <br />
        <h1>carousel example4 指示器 outside</h1>
        <Carousel type={checkValue === '1' ? null : 'card'} 
        indicatorPosition="outside"
        ref="root">
          {list.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-wrapper">
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={index} />
                <h4>{index + 1}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <br />
        <br />
        <br />
        <br />
        <h1>carousel example5 隐藏指示器</h1>
        <Carousel type={checkValue === '1' ? null : 'card'} 
        indicator={false}
        ref="root">
          {list.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-wrapper">
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={index} />
                <h4>{index + 1}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <br />
        <br />
        <br />
        <br />
        <h1>carousel example6 设置高度</h1>
        <Carousel type={checkValue === '1' ? null : 'card'} 
        height={500}
        ref="root">
          {list.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-wrapper">
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={index} />
                <h4>{index + 1}</h4>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
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
