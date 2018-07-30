import React from 'react'
import Carousel from '../src/index'
import {shallow, mount} from 'enzyme'

describe('props test', () => {
  const carousel = mount(<Carousel autoplay 
  arrow={false}
  indicator={false}
  height={400}
  />)
  it('all props is exsits', () => {
    expect(carousel.props().autoplay).toBe(true)
    expect(carousel.props().arrow).toBe(false)
    expect(carousel.props().indicator).toBe(false)
    expect(carousel.props().height).toBe(400)
    expect(carousel.props().interval).toBe(3000)
  })
})

describe('dom test', () => {
  it('arrow is not exsits', () => {
    const carousel = shallow(<Carousel arrow={false} />)
    expect(carousel.find('.arrow-wrapper').exists(false))
  })
  it('indicator is not exsits', () => {
    const carousel = shallow(<Carousel indicator={false} />)
    expect(carousel.find('.xerxes-indicator__wrapper').exists(false))
  })
})
