import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {addResizeListener, removeResizeListener} from './utils/resize-event'

class Carousel extends Component {
  state = {
    items: [],
    activeIndex: -1,
    hover: false
  }
  get iscard () {
    const {type} = this.props
    return type === 'card'
  }
  getChildContext () {
    return {
      component: this
    }
  }

  /**
   * 
   * @param {*选择的下标} index 
   */
  setActiveItem (index) {
    debugger
    let {activeIndex} = this.state
    index = Number(index)

    if (isNaN(index) || index !== Math.floor(index)) {
      process.env.NODE_ENV !== 'production' && 
      console.warn('[Carousel] index must be an int')
      return
    }
    let {length} = this.state.items
    if (index < 0) {
      activeIndex = length -1
    } else if (index >= length) {
      activeIndex = 0
    } else {
      activeIndex = index
    }
    this.setState({activeIndex})
  }
  componentDidMount () {
    const {initIndex} = this.props
    const {items} = this.state
    if (initIndex < items.length && initIndex >= 0) {
      this.setState({
        activeIndex: initIndex
      })
    } else {
      this.setState({activeIndex: 0})
    }
  }
  componentDidUpdate (prevProps, prevState) {
    addResizeListener(this.refs.root, this.resetItemPosition)

    if (prevState.activeIndex !== this.state.activeIndex) {
      this.resetItemPosition(prevState.activeIndex)
      if (this.props.onChange) {
        this.props.onChange(this.state.activeIndex, prevState.activeIndex)
      }
    }
  }
  // 充值元素的位置
  resetItemPosition = (oldIndex) => {
    this.state.items.forEach((item, index) => {
      item.translateItem(index, this.state.activeIndex, oldIndex)
    })
  }
  componentWillUnmount () {
    removeEventListener(this.refs.root, this.resetItemPosition)
  }
  /**
   * 
   * @param {*component} item 
   */
  addItem(item) {
    this.state.items.push(item)
    
  }
  /**
   * @param {*component} item
   */
  removeItem(item) {
    const {items} = this.state
    items.splice(items.indexOf(item), 1)
  }

  // 开始
  startTime = () => {
    const {interval, autoplay} = this.props
    if (interval <= 0 || !autoplay) return
    this.timer = setInterval(this.playSlides(Number(interval)))
  }

  // 切换更改index
  playSlides = () => {
    let {activeIndex, items} = this.state
    if (activeIndex < items.length -1) {
      activeIndex ++
    } else {
      activeIndex = 0
    }
    this.setState({activeIndex})
  }
  // 暂停
  pauseTimer = () => {
    clearInterval(this.timer)
    this.timer = null
  }

  _handleMouseEnter = () => {
    this.setState({hover: true})
    // this.pauseTimer()
  }
  _handleMouseLeave = () => {
    this.setState({hover: false})
    // this.startTime()
  }
  next = () => {
    this.setActiveItem(this.state.activeIndex + 1)
  }
  prev = () => {
    this.setActiveItem(this.state.activeIndex - 1)
  }
  render() {
    const {
      height
    } = this.props
    return (
      <div className={classnames('xerxes-carousel', {
        'xerxes-carousel__card': this.iscard
      })}
      onMouseEnter={this._handleMouseEnter}
      onMouseLeave={this._handleMouseLeave}
      ref="root"
      >
        <div onClick={this.next}>Next</div>
        <div onClick={this.prev}>Prev</div>
        <div className="xerxes-carousel__container"
          style={{height: `${height}px`}}
        >
        {this.props.children}
        </div>
      </div>
    )
  }
}

Carousel.childContextTypes = {
  component: PropTypes.any
}

Carousel.propTypes = {
  type: PropTypes.string,
  height: PropTypes.number,
  interval: PropTypes.number
}

/**
 * type(类型)
 * trigger(指示器触发的类型)
 * autoplay(自动播放)
 * interval(自动播放的间隔时间)
 */

Carousel.defaultProps = {
  autoplay: false,
  interval: 3000
}

export default Carousel
