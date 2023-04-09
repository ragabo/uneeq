import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import LocalVideo from '../LocalVideo'
import { useLocalVideo } from 'uneeq-react-core'
jest.mock('uneeq-react-core')
;(useLocalVideo as jest.Mock).mockReturnValue({
  current: {}
})
describe('LocalVideo', () => {
  it('should render correctly', () => {
    const { container } = render(<LocalVideo />)

    expect(container).not.toBeEmptyDOMElement()
  })
})
