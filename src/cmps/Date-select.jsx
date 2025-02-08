import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import { useState, useEffect } from 'react'

export function DateSelect({ onSetField, checkIn, checkOut }) {
  checkIn = checkIn || new Date()
  checkOut = checkOut || new Date()

  const [monthsToShow, setMonthsToShow] = useState(window.innerWidth <= 450 ? 1 : 2)

  useEffect(() => {
    const handleResize = () => setMonthsToShow(window.innerWidth <= 450 ? 1 : 2)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [range, setRange] = useState([
    {
      startDate: checkIn,
      endDate: checkOut,
      key: 'selection',
    },
  ])

  function handleChange(item) {
    const selection = item.selection
    setRange([selection])
    if (selection.startDate === selection.endDate) {
      onSetField('checkIn', selection.startDate)
    } else {
      onSetField('checkOut', selection.endDate)
    }
  }

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      ranges={range}
      months={monthsToShow} // ✅ Dynamically adjust months displayed
      direction="horizontal"
      rangeColors={['black']}
      showDateDisplay={false}
      showMonthAndYearPickers={false}
    />
  )
}
