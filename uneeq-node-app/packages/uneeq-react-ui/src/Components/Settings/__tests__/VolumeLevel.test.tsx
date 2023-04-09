import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import VolumeLevel from '../VolumeLevel'
import { useVolume } from 'uneeq-react-core'
jest.mock('uneeq-react-core')
;(useVolume as jest.Mock).mockReturnValue(50)
describe('VolumeLevel', () => {
  it('should render correctly', () => {
    const { container } = render(<VolumeLevel />)

    expect(container).not.toBeEmptyDOMElement()
  })
})
