import React, { useRef, useEffect, useState, useContext } from 'react'
import { UneeqContext } from 'uneeq-react-core'
import Arrow from './arrow'
//import './styles.scss';

let windowRef: Window | null
//let closeRefWindow;

interface ICarouselParams {
  messages: CarouselCard[]
}

export class CarouselCard {
  default_action?: string = ''
  image_url?: string = ''
  title?: string = ''
  subtitle?: string = ''
  buttons?: CarouselCardButton[] = []
}

export class CarouselCardButton {
  title?: string = ''
  type?: string = ''
}

export function closeRefWindow() {
  //  windowRef?.close()
}

const Carousel: React.FC<ICarouselParams> = ({ messages }) => {
  /*const CarouselActionTypes = {
    DatePicker: 'date_picker',
    OpenURLInternal: 'internal_url',
    OpenURL: 'web_url',
    Postback: 'postback'
  }
  const { sendText, dispatch } = useContext(UneeqContext)

  const scrollContainer = useRef()
  const [leftButton, setLeftButton] = useState(false)
  const [rightButton, setRightButton] = useState(true)

  const handleClick = (action: any) => {
    if (action.type === CarouselActionTypes.OpenURL) {
      windowRef = window.open(action.url, '_blank')
      windowRef?.focus()
    } else if (action.type === CarouselActionTypes.Postback) {
      console.log('PostBack Clicked-->' + action.payload)
      sendText(action.payload)
    }

    // if (action.title == 'Login') {
    //   var informationElement: HTMLElement | null;
    //   informationElement = document.getElementById('onscreeninfo-container');

    //   if (informationElement)
    //     informationElement.style.display = 'none';
    // }
  }

  const handleScroll = () => {
    console.log('handleScroll')
    const current = document.getElementById('dv_Carsoul_DIV')

    if (current && current.scrollLeft > 0) {
      setLeftButton(true)
    } else {
      setLeftButton(false)
    }
    if (
      current &&
      current.clientWidth === current.scrollWidth - current.scrollLeft
    ) {
      setRightButton(false)
    } else {
      setRightButton(true)
    }
  }
  const handleLeftArrow = () => {
    console.info('handleLeftArrow')
    document.getElementById('dv_Carsoul_DIV')?.scrollTo({
      left: document.getElementById('dv_Carsoul_DIV')!.scrollLeft - 230,
      behavior: 'smooth'
    })
  }

  const handleRightArrow = () => {
    console.info('handleRightArrow')
    document.getElementById('dv_Carsoul_DIV')?.scrollTo({
      left: document.getElementById('dv_Carsoul_DIV')!.scrollLeft + 230,
      behavior: 'smooth'
    })
  }*/

  const mainColor = ''

  const [index, setIndex] = useState(0)
  const carousel = useRef<HTMLElement>(null)
  const fItem = useRef<HTMLElement>(null)
  const nextBtn = useRef<HTMLElement>(null)
  const prevBtn = useRef<HTMLElement>(null)
  const CarouselActionTypes = {
    DatePicker: 'date_picker',
    OpenURLInternal: 'internal_url',
    OpenURL: 'web_url',
    Postback: 'postback'
  }
  const { sendText, dispatch } = useContext(UneeqContext)

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

  const handleClick = (action: any) => {
    if (action.type === CarouselActionTypes.OpenURL) {
      if (action.payload) {
        sendText(action.payload)
      }
      windowRef = window.open(action.url, '_blank')
      windowRef?.focus()
    } else if (action.type === CarouselActionTypes.Postback) {
      console.log('PostBack Clicked-->' + action.payload)
      sendText(action.payload)
    }

    // if (action.title == 'Login') {
    //   var informationElement: HTMLElement | null;
    //   informationElement = document.getElementById('onscreeninfo-container');

    //   if (informationElement)
    //     informationElement.style.display = 'none';
    // }
  }

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
    <div id="dv_Carsoul_DIV" className="rw-carousel-widget">
      <div
        ref={carousel as React.RefObject<HTMLDivElement>}
        className={`rw-carousel-container m${index}`}
      >
        <div
          ref={fItem as React.RefObject<HTMLDivElement>}
          style={{ transform: `translateX(-${300 * index}px)` }}
        >
          {messages.map((carouselCard, index) => {
            const mystyle = {
              backgroundImage: `url(${carouselCard.image_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain'
            }
            return (
              <div>
                <span style={mystyle}></span>
                <h2>{carouselCard.title}</h2>
                <h3>{carouselCard.subtitle}</h3>
                <div className="carousel_btn_holder">
                  {carouselCard.buttons?.map((button, buttonIndex) => {
                    if (button.type === 'web_url2') {
                      return <button>{button.title}</button>
                    }
                    return (
                      <button onClick={() => handleClick(button)}>
                        {button.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="rw-action">
        <span className="rw-action-left" ref={nextBtn} onClick={nextClicked}>
          <svg>
            <use xlinkHref="#arrow_icon"></use>
          </svg>
        </span>
        <span className="rw-action-right" ref={prevBtn} onClick={prevClicked}>
          <svg>
            <use xlinkHref="#arrow_icon"></use>
          </svg>
        </span>
      </div>
    </div>
  )

  // return (
  //   <React.Fragment>
  //     <div
  //       id="dv_Carsoul_DIV"
  //       className="rw-carousel-container"
  //       onScroll={() => handleScroll()}
  //     >
  //       {messages.map((carouselCard, index) => {
  //         return (
  //           <div className="rw-carousel-card" key={index}>
  //             <a
  //               //href={defaultActionUrl}
  //               //target={linkTarget || '_blank'}
  //               rel="noopener noreferrer"
  //               onClick={() => handleClick(carouselCard.default_action)}
  //             >
  //               {carouselCard.image_url ? (
  //                 <img
  //                   className="rw-carousel-card-image"
  //                   src={carouselCard.image_url}
  //                   alt={`${carouselCard.title} ${carouselCard.subtitle}}}`}
  //                 />
  //               ) : (
  //                 <div className="rw-carousel-card-image" />
  //               )}
  //             </a>
  //             <a
  //               className="rw-carousel-card-title"
  //               //href={defaultActionUrl}
  //               //target={linkTarget || '_blank'}
  //               rel="noopener noreferrer"
  //               onClick={() => handleClick(carouselCard.default_action)}
  //             >
  //               {carouselCard.title}
  //             </a>
  //             <a
  //               className="rw-carousel-card-subtitle"
  //               //href={defaultActionUrl}
  //               //target={linkTarget || '_blank'}
  //               rel="noopener noreferrer"
  //               onClick={() => handleClick(carouselCard.default_action)}
  //             >
  //               {carouselCard.subtitle}
  //             </a>
  //             <div className="rw-carousel-buttons-container">
  //               {carouselCard.buttons?.map((button, buttonIndex) => {
  //                 if (button.type === 'web_url2') {
  //                   return (
  //                     <a
  //                       key={buttonIndex}
  //                       //href={button.url}
  //                       //target={linkTarget || '_blank'}
  //                       rel="noopener noreferrer"
  //                       className="rw-reply"
  //                       style={{ borderColor: mainColor, color: mainColor }}
  //                     >
  //                       <span>{button.title}</span>
  //                     </a>
  //                   )
  //                 }
  //                 return (
  //                   // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  //                   <div
  //                     key={buttonIndex}
  //                     className="rw-reply"
  //                     onClick={() => handleClick(button)}
  //                     role="button"
  //                     tabIndex={0}
  //                     style={{ borderColor: mainColor, color: mainColor }}
  //                   >
  //                     <span>{button.title}</span>
  //                   </div>
  //                 )
  //               })}
  //             </div>
  //           </div>
  //         )
  //       })}
  //     </div>
  //     <div className="rw-carousel-arrows-container">
  //       {leftButton && (
  //         // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  //         <div
  //           className="rw-left-arrow rw-carousel-arrow"
  //           onClick={() => handleLeftArrow()}
  //           role="button"
  //           tabIndex={0}
  //         >
  //           <div className="rw-arrow">
  //             <Arrow />
  //           </div>
  //         </div>
  //       )}
  //       {rightButton && (
  //         // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  //         <div
  //           className="rw-right-arrow rw-carousel-arrow"
  //           onClick={() => handleRightArrow()}
  //           role="button"
  //           tabIndex={0}
  //         >
  //           <div className="rw-arrow">
  //             <Arrow />
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </React.Fragment>
  // )
}

//export {closeRefWindow};

export default Carousel
