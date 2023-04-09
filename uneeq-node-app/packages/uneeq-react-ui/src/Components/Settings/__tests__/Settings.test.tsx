import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Settings from '../Settings'
import { useUneeqDeviceList, useUneeqState } from 'uneeq-react-core'
// @ts-ignore
global.HTMLMediaElement.prototype.pause = jest.fn()
jest.mock('uneeq-react-core')
;(useUneeqState as jest.Mock).mockReturnValue({
  settingsOpen: true
})
;(useUneeqDeviceList as jest.Mock).mockReturnValue({
  devices: {
    audioInput: [],
    audioOutput: [],
    videoInput: []
  },
  selectedDevices: {
    audioInput: null,
    audioOutput: null,
    videoInput: null
  },
  setDevice: jest.fn()
})
describe('Settings', () => {
  it('should render correctly', () => {
    const { container } = render(<Settings audio={{}} />)

    expect(container).toHaveTextContent('Settings')
  })
})
