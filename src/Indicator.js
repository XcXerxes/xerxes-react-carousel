import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Indicator extends Component {
  render() {
    const {indicatorClassName, className, indicatorClick} = this.props
    return (
      <li className={classnames('xerxes-indicator__item', className)}
      onClick={indicatorClick}
      >
        <a href="javascript:;" className={classnames(indicatorClassName)}></a>
      </li>
    )
  }
}

Indicator.propTypes = {

}

export default Indicator
