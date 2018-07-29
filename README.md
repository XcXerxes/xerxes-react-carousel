## xerxes-carsoule

* [基本介绍](#基本介绍)
  *[安装说明](#安装说明)
  *[props说明](#props说明)

## 基本介绍
这是一个基于 `reactjs` 的轮播图组件，包含基本的轮播和3d的轮播效果。

### 安装说明

使用 `npm` 或者 `yarn` 进行安装

`
npm i xerxes-react-carousel or yarn add xerxes-react-carousel
`

### props说明

Attributes | Type | Default | value | Description
---------- |------|---------|------------
initIndex  |Number|    ❌   | --     |初始化时指向的carouselItem 的下标
autoplay   |Boolean| false  | true || false  |是否自动播放
type       |String |   ❌   |  card | 轮播图的类型
interval   | Number | 3000  | > 0   | 轮播切换的间隔时间，单位ms
height     | Number | 300   | > 0   | 设置组件的高度