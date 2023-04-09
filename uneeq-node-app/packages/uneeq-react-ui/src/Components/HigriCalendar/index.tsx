import React, { useRef, useEffect, useState, useContext } from 'react'
import { UneeqContext } from 'uneeq-react-core'

import { styles as s } from '../OnScreenInfo/styles'
const styles = s.hijriCalender

//import 'react-calendar/dist/Calendar.css'
//import Calendar from 'react-calendar'

import { Calendar } from 'react-multi-date-picker'
import arabicCalender from 'react-date-object/calendars/arabic'
import arabic_ar from 'react-date-object/locales/arabic_ar'
import arabic_en from 'react-date-object/locales/arabic_en'
import gregorian_en from 'react-date-object/locales/gregorian_en'

const arabic_gregorian = {
  name: 'gregorian_en_lowercase',
  months: [
    ['محرم', 'jan'],
    ['صفر', 'feb'],
    ['ربيع الأول', 'mar'],
    ['ربيع الآخر', 'apr'],
    ['جمادى الأولى', 'may'],
    ['	جمادى الآخرة', 'jun'],
    ['رجب', 'jul'],
    ['شعبان', 'aug'],
    ['رمضان', 'sep'],
    ['شوال', 'oct'],
    ['ذي القعدة', 'nov'],
    ['ذي الحجة', 'dec']
  ],
  weekDays: [
    ['سب', 'سب'],
    ['أح', 'أح'],
    ['ثن', 'ثن'],
    ['ثل', 'ثل'],
    ['أر', 'أر'],
    ['خم', 'خم'],
    ['جم', 'جم']
  ],
  digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  meridiems: [
    ['صباحا', 'am'],
    ['مساءا', 'pm']
  ]
}

let windowRef: Window | null
interface IHigriCalendarComponentParams {
  params: any
  isArabicLoca?: boolean
}

export function closeRefWindow() {
  windowRef?.close()
}

const HigriCalendarComponent: React.FC<IHigriCalendarComponentParams> = ({
  params,
  isArabicLoca
}) => {
  const [index, setIndex] = useState(0)
  const carousel = useRef<HTMLElement>(null)
  const fItem = useRef<HTMLElement>(null)
  const nextBtn = useRef<HTMLElement>(null)
  const prevBtn = useRef<HTMLElement>(null)

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

  const [value] = useState(new Date())

  const setDates = (date: any) => {
    var datestr = date.year + '-' + date.month + '-' + date.day
    console.log('Date')
    console.log(datestr)
    sendText(datestr)
  }

  return (
    <Calendar
      className="custom-calendar"
      value={value}
      onChange={setDates}
      calendar={arabicCalender}
      format="YYYY-MM-DD"
      locale={isArabicLoca ? arabic_ar : arabic_en}
    />
  )
}

export default HigriCalendarComponent
