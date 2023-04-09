import React, { useRef, useEffect, useState, useContext } from 'react'
import {
  trackHandler,
  UneeqContext,
  useIsSmallScreen,
  useUneeqSpaceToTalk,
  useUneeqState
} from 'uneeq-react-core'
let windowRef: Window | null
interface IGMapsParams {
  params: any
}

export function closeRefWindow() {
  windowRef?.close()
}

const GMapsComponent: React.FC<IGMapsParams> = ({ params }) => {
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

  function convertToPlain(html: any) {
    // Create a new div element
    var tempDivElement = document.createElement('div')

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || ''
  }

  let map: google.maps.Map
  //24.740019391700766, 46.63054927503081
  const center: google.maps.LatLngLiteral = {
    lat: 24.740019391700766,
    lng: 46.63054927503081
  }
  var load = true
  function initMap(): void {
    if (!load) return

    var directionsService = new google.maps.DirectionsService()
    var directionsRenderer = new google.maps.DirectionsRenderer()

    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: 15
    })
    directionsRenderer.setMap(map)
    directionsService.route(
      {
        origin:
          'Crowne Plaza Riyadh Rdc Hotel & Convention, Wady al Muaydin Street, Unit 4, Imam Saud Ibn Abdul Aziz Road, Riyadh 12382, Saudi Arabia',
        destination:
          'SBM - Saudi Business Machines, Bin Abdulaziz Alawal Road, An Nakheel, Prince Turkey, Riyadh 11421, Saudi Arabia',
        travelMode: google.maps.TravelMode.DRIVING,
        region: 'SA'
      },
      function(result, status) {
        if (status === 'OK') {
          load = false
          directionsRenderer.setDirections(result)
          //console.log(result);
          var instructions = ''
          if (
            result &&
            result.routes.length &&
            result.routes[0].legs.length &&
            result.routes[0].legs[0].steps.length
          ) {
            for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
              //console.log(result.routes[0].legs[0].steps[i].instructions);
              instructions +=
                convertToPlain(
                  result.routes[0].legs[0].steps[i].instructions.replace(
                    '</b>',
                    ' </b> '
                  )
                ) + ','
              //console.log(result.routes[0].legs[0].steps[i].instructions);
              //console.log(convertToPlain(result.routes[0].legs[0].steps[i].instructions.replace("</b>", " </b> ")));
            }
          }
          console.log(instructions)
          //sendText("<<>>" + instructions)
        }
      }
    )
  }
  setTimeout(() => {
    //console.log(document.getElementById("map"));
    //initMap();
    dispatch({
      type: 'uneeqMessage',
      payload: {
        answer: 'Hello, This is Sara your special assistant.',
        uneeqMessageType: 'AvatarAnswer',
        answerAvatar: JSON.stringify({
          instructions: { displayHtml: { html: '' } }
        }),
        answerSpeech: 'Hello, This is Sara your special assistant.'
      }
    })
  }, 5000)
  return <div id="map" className="rw-carousel-widget"></div>
}

export default GMapsComponent
