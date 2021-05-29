import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

test('<CreateBlog /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(
    <CreateBlog createBlog={createBlog}/>
  )

  // get input elements
  const form = component.container.querySelector('form')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')

  // fill out and submit form
  fireEvent.change(author, {
    target: { value: 'shakib' }
  })
  fireEvent.change(url, {
    target: { value: 'shakib.dev' }
  })
  fireEvent.change(title, {
    target: { value: 'shingeki no kyojin' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].author).toBe('shakib')
  expect(createBlog.mock.calls[0][0].url).toBe('shakib.dev')
  expect(createBlog.mock.calls[0][0].title).toBe('shingeki no kyojin')
})