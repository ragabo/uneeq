import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import AudioTest from '../AudioTest'

window.HTMLMediaElement.prototype.pause = () => {}

describe('AudioTest', () => {
  it('should render', () => {
    const { findByLabelText } = render(<AudioTest audio={{ testMP3: {} }} />)

    expect(findByLabelText('Playing')).toBeDefined()
  })
})
