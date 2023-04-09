import React from 'react'
import { renderIgnoringUnstableFlushDiscreteUpdates } from '../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

describe('App', () => {
  it('should render correctly', () => {
    const { container } = renderIgnoringUnstableFlushDiscreteUpdates(<App />)

    expect(container).toHaveTextContent('a digital assistant that can help you')
  })
})
