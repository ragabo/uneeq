import React, { useRef, useEffect, useState, useContext } from 'react'
import { UneeqContext } from 'uneeq-react-core'

import { styles as s } from '../OnScreenInfo/styles'
const styles = s.hijriCalender

//import 'react-calendar/dist/Calendar.css'
//import Calendar from 'react-calendar'
import { Calendar } from 'react-multi-date-picker'

let windowRef: Window | null
interface ICalendarComponentParams {
  params: any
}

export function closeRefWindow() {
  windowRef?.close()
}

const CalendarComponent: React.FC<ICalendarComponentParams> = ({ params }) => {
  const { sendText, dispatch } = useContext(UneeqContext)

  const [index, setIndex] = useState(0)
  const carousel = useRef<HTMLElement>(null)
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

  const [value] = useState(new Date())
  const setDates = (date: any) => {
    var datestr = date.year + '-' + date.month + '-' + date.day
    console.log('Date')
    console.log(datestr)
    sendText(datestr)
  }

  return (
    <Calendar
      value={value}
      onChange={setDates}
      maxDate={Date.now()}
      format="YYYY-MM-DD"
      className="custom-calendar"
    />
  )
}

export default CalendarComponent
