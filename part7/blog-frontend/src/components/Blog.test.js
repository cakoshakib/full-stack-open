import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let addLike

  beforeEach(() => {
    const blog = {
      author: 'unknown',
      url: 'shakib.dev',
      title: 'the lost cat',
      user: '60ae91dc9c2c5c16a7fa688e'
    }

    const mockHandler = jest.fn()
    addLike = jest.fn()
    component = render(
      <Blog blog={blog} addLike={addLike} deleteBlog={mockHandler} user={mockHandler}/>
    )
  })

  test('renders content', () => {
    //component.debug()

    expect(component.container).toHaveTextContent(
      'unknown'
    )
    expect(component.container).toHaveTextContent(
      'the lost cat'
    )

    const element = component.container.querySelector('.moreInfo')
    expect(element).toHaveStyle('display: none')
  })

  test('after button, more info displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.moreInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('two like presses calls event handler twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})