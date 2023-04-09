import React, { useRef, useEffect, useState, useContext } from 'react'
import {
  trackHandler,
  UneeqContext,
  useIsSmallScreen,
  useUneeqSpaceToTalk,
  useUneeqState
} from 'uneeq-react-core'
let windowRef: Window | null

interface IImageComponentParams {
  imageURL: string
}

export function closeRefWindow() {
  windowRef?.close()
}

const ImageComponent: React.FC<IImageComponentParams> = ({ imageURL }) => {
  const { sendText, dispatch } = useContext(UneeqContext)

  const [index, setIndex] = useState(0)
  const fItem = useRef<HTMLElement>(null)
  const nextBtn = useRef<HTMLElement>(null)
  const prevBtn = useRef<HTMLElement>(null)

  useEffect(() => {
    if (fItem.current) {
      setIndex(fItem.current.children.length - 1)
    }
  }, [nextBtn])

  useEffect(() => {
    if (fItem.current && fItem.current.children.length == 1) {
      prevBtn.current?.classList.add('is-hidden')
      nextBtn.current?.classList.add('is-hidden')
    } else if (index === 0) {
      nextBtn.current?.classList.add('is-hidden')
      prevBtn.current?.classList.remove('is-hidden')
    } else if (fItem.current && index === fItem.current.children.length - 1) {
      nextBtn.current?.classList.remove('is-hidden')
      prevBtn.current?.classList.add('is-hidden')
    } else {
      prevBtn.current?.classList.remove('is-hidden')
      nextBtn.current?.classList.remove('is-hidden')
    }
  }, [index])

  const handleClick = (action: any) => {}

  const nextClicked = () => {
    console.log('right clicked', index)
    if (index === 0) return
    setIndex(index - 1)
  }

  const prevClicked = () => {
    if (fItem.current && index >= fItem.current.children.length - 1) return
    setIndex(index + 1)
  }

  return (
    <div className="rw-carousel-widget">
      <img src={imageURL} alt="Test Image"></img>
    </div>
  )
}

export default ImageComponent
