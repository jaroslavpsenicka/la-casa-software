import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NewsPage from '../pages/NewsPage'

configure({ adapter: new Adapter() });

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      news: {
        loading: false, 
        data: [{
          Id: 1,
          Time: '2021-03-05T16:02:00.000Z',
          Headlines: 'Hello',
          Description: 'World'
        }]
      }
    })
  }
})

class ResizeObserver {
  observe() {}
  unobserve() {}
}

window.ResizeObserver = ResizeObserver;

describe('NewsPage', () => {

  it('render plain', () => {
    const wrapper = mount(<NewsPage />)
    expect(wrapper).toMatchSnapshot()
  })

  it('click to open', () => {
    const wrapper = mount(<NewsPage />)
    wrapper.find('#row-1-toggle').simulate('click')
    expect(wrapper).toMatchSnapshot()
  })

})
