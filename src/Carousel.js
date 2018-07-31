import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { throttle } from 'throttle-debounce'
import { addResizeListener, removeResizeListener } from './utils/resize-event'
import ButtonArrow from './Button-arrow'
import Indicator from './Indicator'

class Carousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      activeIndex: -1,
      hover: false
    }
    this.throttleArrowClick = throttle(300, true, index => {
      this.setActiveItem(index)
    })
  }
  get iscard() {
    const { type } = this.props
    return type === 'card'
  }
  getChildContext() {
    return {
      component: this
    }
  }

  /**
   * 
   * @param {*选择的下标} index 
   */
  setActiveItem(index) {
    let { activeIndex } = this.state
    index = Number(index)

    if (isNaN(index) || index !== Math.floor(index)) {
      process.env.NODE_ENV !== 'production' &&
        console.warn('[Carousel] index must be an int')
      return
    }
    let { length } = this.state.items
    if (index < 0) {
      activeIndex = length - 1
    } else if (index >= length) {
      activeIndex = 0
    } else {
      activeIndex = index
    }
    this.setState({ activeIndex })
  }
  componentDidMount() {
    const { initIndex, autoplay } = this.props
    const { items } = this.state
    if (initIndex < items.length && initIndex >= 0) {
      this.setState({
        activeIndex: initIndex
      })
    } else {
      this.setState({
        activeIndex: 0
      })
    }
    if (autoplay) {
      this.startTime()
    }
  }
  componentDidUpdate(prevProps, prevState) {
    addResizeListener(this.root, this.resetItemPosition)

    if (prevState.activeIndex !== this.state.activeIndex) {
      this.resetItemPosition(prevState.activeIndex)
      if (this.props.onChange) {
        this.props.onChange(this.state.activeIndex, prevState.activeIndex)
      }
    }
  }
  // 重置元素的位置
  resetItemPosition = (oldIndex) => {
    this.state.items.forEach((item, index) => {
      item.translateItem(index, this.state.activeIndex, oldIndex)
    })
  }
  componentWillUnmount() {
    removeEventListener(this.root, this.resetItemPosition)
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
    const { items } = this.state
    items.splice(items.indexOf(item), 1)
  }

  // 开始
  startTime = () => {
    const { interval, autoplay } = this.props
    if (interval <= 0 || !autoplay) return
    this.timer = setInterval(this.playSlides, Number(interval))
  }

  // 切换更改index
  playSlides = () => {
    let { activeIndex, items } = this.state
    if (activeIndex < items.length - 1) {
      activeIndex++
    } else {
      activeIndex = 0
    }
    this.setState({ activeIndex })
  }
  // 暂停
  pauseTimer = () => {
    clearInterval(this.timer)
  }

  _handleMouseEnter = () => {
    this.setState({ hover: true })
    this.pauseTimer()
  }
  _handleMouseLeave = () => {
    this.setState({ hover: false })
    this.startTime()
  }
  next = () => {
    this.throttleArrowClick(this.state.activeIndex + 1)
  }
  prev = () => {
    this.throttleArrowClick(this.state.activeIndex - 1)
  }
  
  /**
   * @param {*当前选中的指示器下标} index
   */
  indicatorClick = (index) => {
    this.throttleArrowClick(index)
  }
  /**
   * @param {*轮播的数量} items
   */
  renderIndicatorItem = (items) => {
    const {indicatorPosition, indicatorClassName} = this.props
    const indicators = items.map((item, index) => (
      <Indicator key={index} 
      indicatorClick={() => this.indicatorClick(index)} className={classnames({'active': this.state.activeIndex === index})}
      
      />
    ))
    return (
      <ul className={classnames('xerxes-indicator__wrapper', {
        'outside': indicatorPosition === 'outside'
      })}>
        {indicators}
      </ul>
    )
  }
  render() {
    const {
      height,
      arrow,
      indicator,
      className,
      style,
      arrowClassName
    } = this.props
    const {items} = this.state
    return (
      <div className={classnames('xerxes-carousel', {
        'xerxes-carousel__card': this.iscard
      }, className)}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        ref={ref => this.root = ref}
        style={style}
      >
        {arrow && <Fragment>
          <ButtonArrow position="right" arrowClick={this.next} 
          arrowClassName={arrowClassName}
          />
          <ButtonArrow position="left" arrowClick={this.prev} />
        </Fragment>
        }
        <div className="xerxes-carousel__container"
          style={{ height: `${height}px` }}
        >
          {this.props.children}
        </div>
        {indicator && this.renderIndicatorItem(items)}
      </div>
    )
  }
}

Carousel.childContextTypes = {
  component: PropTypes.any
}

Carousel.propTypes = {
  initIndex: PropTypes.number,
  type: PropTypes.string,
  height: PropTypes.number,
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
  arrow: PropTypes.bool,
  indicator: PropTypes.bool,
  indicatorPosition: PropTypes.string,
  indicatorClassName: PropTypes.string,
}

/**
 * type(类型)
 * trigger(指示器触发的类型)
 * autoplay(自动播放)
 * interval(自动播放的间隔时间)
 */

Carousel.defaultProps = {
  autoplay: false,
  interval: 3000,
  arrow: true,
  indicator: true
}

export default Carousel
