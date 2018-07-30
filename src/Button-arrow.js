import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Button-arrow.css'

class ButtonArrow extends Component {
  render() {
    const {className, position, arrowClick, arrowClassName} = this.props
    return (
      <div className={classnames('arrow-wrapper', className, {
        'left': position === 'left',
        'right': position === 'right'
      })}>
        <i className={classnames('iconfont', {
          'icon-left-circle': position === 'left' && !arrowClassName,
          'icon-right-circle': position === 'right' && !arrowClassName,
        }, arrowClassName)}
        onClick={arrowClick}
        ></i>
      </div>
    )
  }
}

ButtonArrow.propTypes = {
  position: PropTypes.string.isRequired,
  arrowClick: PropTypes.func,
  arrowClassName: PropTypes.string
}

export default ButtonArrow
