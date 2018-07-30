import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class CarouselItem extends Component {
  state = {
    active: false,
    inStage: false,
    animating: false,
    translate: 0,
    scale: 1,
    ready: false
  }
  _handleItemClick = () => {
    const contextComponent = this.context.component
    if (contextComponent.iscard) {
      const index = contextComponent.state.items.indexOf(this)
      console.log(index)
      contextComponent.throttleArrowClick(index)
    }
  }
  componentWillMount () {
    this.context.component.addItem(this)
  }
  componentWillUnmount () {
    this.context.component.removeItem(this)
  }

  get CARD_SCALE () {
    return .83
  }

  /**
   * 
   * @param {*} index
   * @param {*} activeIndex
   * @param {*个数} length
   */
  processIndex (index, activeIndex, length) {
    if (activeIndex === 0 && index === length -1) {
      return -1
    } else if (activeIndex === length -1 && index === 0) {
      return length
    } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
      return length + 1
    } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
      return -2
    }
    return index
  }

  calculateTranslate (index, activeIndex, parentWidth) {
    if (this.state.inStage) {
      return parentWidth * ((2 - this.CARD_SCALE) * (index - activeIndex) + 1) / 4
    } else if (index < activeIndex) {
      return - (1 + this.CARD_SCALE) * parentWidth / 4
    } else {
      return (4 - 1 + this.CARD_SCALE) * parentWidth / 4
    }
  }

  /**
   * 
   * @param {*component默认的} index 
   * @param {*当前的component} activeIndex 
   * @param {*上一个component} oldIndex 
   */
  translateItem(index, activeIndex, oldIndex) {
    const {component} = this.context
    // 获取父元素的dom节点
    const parent = ReactDOM.findDOMNode(this.context.component)
    // 获取偏移width
    const parentWidth = parent.offsetWidth
    // slide的个数
    const {length} = component.state.items

    if (!component.iscard && oldIndex !== undefined) {
      this.state.animating = index === activeIndex || index === oldIndex
    }

    if (index !== activeIndex && length > 2) {
      index = this.processIndex(index, activeIndex, length)
    }

    if (component.iscard) {
      // 当前元素index， 前一个元素， 后一个元素
      this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
      this.state.active = index === activeIndex
      this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth)
      console.log('translate ===================')
      console.log(this.state.translate)
      console.log('translate ===================')
      this.state.scale = this.state.active ? 1 : this.CARD_SCALE
    } else {
      this.state.active = index === activeIndex
      this.state.translate = parentWidth * (index - activeIndex)
    }
    this.state.ready = true
    this.forceUpdate()
  }
  render() {
    const {active, inStage, animating, translate, scale, ready} = this.state
    const {iscard} = this.context.component
    return ready && (
      <div className={classnames('xerxes-carousel__item', {
        'is-active': active,
        'xerxes-carousel__item-card': iscard,
        'is-in-stage': inStage,
        'is-animating': animating
      })}
      onClick={this._handleItemClick}
      style={{
        transform: `translateX(${translate}px) scale(${scale})`
      }}
      >
        {
          (iscard && !active) && (
            <div
            className="xerxes-carousel__mask"
            >
            </div>
          )
        }
        {this.props.children}
      </div>
    )
  }
}

CarouselItem.propTypes = {

}
CarouselItem.contextTypes = {
  component: PropTypes.any
}

export default CarouselItem
