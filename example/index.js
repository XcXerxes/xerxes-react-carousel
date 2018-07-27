import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../src'

const App = () => (
  <div>
    <h1>carousel example1</h1>
    <Carousel type="card">
      <Carousel.Item>
        <h1>1111</h1>
      </Carousel.Item>
      <Carousel.Item>
        <h1>2222</h1>
      </Carousel.Item>
    </Carousel>
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
