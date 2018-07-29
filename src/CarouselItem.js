import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class CarouselItem extends Component {
  state = {
    active: false,
    inStage: false,
    animating: false
  }
  _handleItemClick = () => {
    const contextComponent = this.context.component
    if (contextComponent.iscard) {
      const index = contextComponent.state.items.indexOf(this)
      console.log(index)
      // contextComponent.setActiveItem(index)
    }
  }
  componentWillMount () {
    this.context.component.addItem(this)
  }
  componentWillUnmount () {
    this.context.component.removeItem(this)
  }
  render() {
    const {active, inStage, animating} = this.state
    return (
      <div className={classnames('xerxes-carousel__item', {
        'is-active': active,
        'xerxes-carousel__item-card': this.context.component.iscard,
        'is-in-stage': inStage,
        'is-animating': animating
      })}
      onClick={this._handleItemClick}
      style={{
        transform: `translateX(${translate}px) scale(${scale})`
      }}
      >
        {
          this.context.component.iscard && (
            <div show={!active} 
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
