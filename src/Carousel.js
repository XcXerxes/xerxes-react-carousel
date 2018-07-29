import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

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
  componentDidUpdate () {
    console.log('update')
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
    this.pauseTimer()
  }
  _handleMouseLeave = () => {
    this.setState({hover: false})
    this.startTime()
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
      >
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
