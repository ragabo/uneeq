import React from 'react'
import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import DeviceList from '../DeviceList'
import { useUneeqDeviceList, useUneeqState } from 'uneeq-react-core'
jest.mock('uneeq-react-core')
;(useUneeqState as jest.Mock).mockReturnValue({
  transcriptOpen: true
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
describe('DeviceList', () => {
  it('should render title correctly', () => {
    const { container } = render(<DeviceList deviceType="audioInput" />)

    expect(container).toHaveTextContent('Mic')
  })
})
