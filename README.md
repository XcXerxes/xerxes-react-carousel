## xerxes-carsoule

* [基本介绍](#基本介绍)
  * [安装说明](#安装说明)
  * [如何使用](#如何使用)
  * [props说明](#props说明)
  * [methods说明](#methods说明)

## 基本介绍
这是一个基于 `reactjs` 的轮播图组件，包含基本的轮播和3d的轮播效果。

### 安装说明

使用 `npm` 或者 `yarn` 进行安装

```
npm i xerxes-react-carousel or yarn add xerxes-react-carousel

```

### 如何使用

```

import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from 'xerxes-react-carousel'

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

const App = () => (
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
)

ReactDOM.render(<App />, document.getElementById('root'))


```

### props说明

| 属性 | 类型 | 默认值 | 可选值 | 描述 |
| :--- | :----: | :----: | :---: | :--- |
| initIndex | Number | ❌  | -- | 初始化时指向的carouselItem 的下标，默认从0开始 |
| height     | Number | 300   | > 0   | 设置组件的高度 |
| autoplay   | Boolean | false  | true or false  | 是否自动播放 |
| type       | String  |   ❌   |  card | 轮播图的类型 |
| interval   | Number | 3000  | > 0   | 轮播切换的间隔时间，单位ms |
| arrow      | Boolean | true | false or true | 是否显示切换按钮 |
| indicator  | Boolean | true | false or true | 是否显示指示器  |
| indicatorPosition | String | ❌ | outside or none | 指示器的位置
| indicatorClassName | String | ❌ | --- | 指示器的类名 |


### methods说明

