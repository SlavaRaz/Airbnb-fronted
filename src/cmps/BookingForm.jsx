import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { utilService } from '../services/util.service'
import { DateSelect } from '../cmps/Date-select.jsx'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GuestSelect } from './Guest-select.jsx';
import { BtnSquareBlack } from './ui/buttons/btn-square-black.jsx'
import { BtnSquareColor } from './ui/buttons/btn-square-color.jsx'
import { OrderDetails } from './OrderDetails.jsx'


export function BookingForm({ stay, openTab, setOpenTab, reserveBtnRef }) {

  const [searchParams, setSearchParams] = useSearchParams()
  const [refVisible, setRefVisible] = useState(false)
  const navigate = useNavigate()

  const orderParams = {
    checkIn: searchParams.get('checkIn')
      ? new Date(+searchParams.get('checkIn'))
      : '',
    checkOut: searchParams.get('checkOut')
      ? new Date(+searchParams.get('checkOut'))
      : '',
    guests: {
      adults: +searchParams.get('adults') || 1,
      children: +searchParams.get('children') || 0,
      infants: +searchParams.get('infants') || 0,
      pets: +searchParams.get('pets') || 0,
    },
  }

  function onSetField(field, value) {
    if (field === 'guests') {
      searchParams.set('adults', value.adults)
      searchParams.set('children', value.children)
      searchParams.set('infants', value.infants)
      searchParams.set('pets', value.pets)
    }
    if (field === 'checkIn' || field === 'checkOut') {
      if (value) {
        value = value.getTime()
      }
      searchParams.set(field, value)
    }
    setSearchParams(searchParams)
  }

  function handleReserveClick() {
    const paramsToSet = utilService.objectToSearchParams({
      checkIn: orderParams.checkIn.getTime(),
      checkOut: orderParams.checkOut.getTime(),
      ...orderParams.guests,
    });
    navigate(`/book/stay/${stay._id}?${paramsToSet}`)
  }

  const checkInSubHeading = orderParams.checkIn
    ? `${utilService.formattedDate(+orderParams.checkIn)}`
    : 'Add Date'
  const checkOutSubHeading = orderParams.checkOut
    ? `${utilService.formattedDate(+orderParams.checkOut)}`
    : 'Add Date'


  function getGuestsSubHeading() {
    const { adults, children, infants, pets } = orderParams.guests
    const parts = [
      adults && `${adults} ${adults > 1 ? 'adults' : 'adult'}`,
      children && `${children} ${children > 1 ? 'children' : 'child'}`,
      infants && `${infants} ${infants > 1 ? 'infants' : 'infant'}`,
      pets && `${pets} ${pets > 1 ? 'pets' : 'pet'}`,
    ].filter(Boolean)

    if (!parts.length) return 'Add Guests'
    if (parts.length === 1 && parts[0] === '1 adult') return '1 guest'
    return parts.join(', ')
  }

  return (
    <section className='booking-modal'>
      <div className='booking-modal-form flex'>
        <header className='booking-form-header flex'>
          <h4>
            <span className="order-price">${(Math.round(stay.price)).toLocaleString()}</span>
            <span className="order-night" style={{ fontFamily: 'cereal-Book' }}> night</span>
          </h4>
        </header>
        <section className='picker-container'>
          {(openTab === 'checkIn' || openTab === 'checkOut') && (
            <section className='date-picker-modal'>
              <div className='date-picker-header'>
                {(orderParams.checkIn && orderParams.checkOut) ? (<h4>{utilService.totalDays(orderParams.checkIn, orderParams.checkOut)} nights</h4>) : <h4>Select Dates</h4>}
                {(orderParams.checkIn && orderParams.checkOut) ? (<h5>{utilService.ShortFormattedDate(orderParams.checkIn)}-{utilService.ShortFormattedDate(orderParams.checkOut)}</h5>) : <h5>Minimum nights: 2 days</h5>}
              </div>
              <DateSelect
                checkIn={orderParams.checkIn}
                checkOut={orderParams.checkOut}
                onSetField={onSetField}
                className='date-picker'
              />
              <div className="date-picker-modal-btns">
                <button className="reset-dates-btn clean-button" onClick={() => { onSetField('checkIn', ''); handleReserveClick('checkOut', '') }}>Clear dates</button>
                <div className='close-dates-btn'>
                  <BtnSquareBlack onClick={() => setOpenTab('')}>Close</BtnSquareBlack>
                </div>
              </div>
            </section>
          )}
          <section className={(openTab === 'checkIn' || openTab === 'checkOut') ? 'dates-selection active' : 'dates-selection'}>
            <button
              onClick={() => setOpenTab('checkIn')}
              className='clean-button check-in picker'>
              <div className='order-heading'>Check-In</div>
              <div className='order-sub-heading'>{checkInSubHeading}</div>
            </button>
            <button
              onClick={() => setOpenTab('checkOut')}
              className='clean-button check-out picker'>
              <div className='order-heading'>Check-Out</div>
              <div className='order-sub-heading'>{checkOutSubHeading}</div>
            </button>
          </section>
          <div className='guest-picker'>
            <button className='clean-button guest-btn' onClick={() => (openTab === 'guests' ? setOpenTab(null) : setOpenTab('guests'))}>
              <div className='order-heading'>Guests</div>
              <div className='order-sub-heading'>{getGuestsSubHeading()}</div>
              <div className="drawer-arrow-icon">{(openTab === 'guests' ? <IoIosArrowUp /> : <IoIosArrowDown />)}</div>
            </button>
            {openTab === 'guests' && (
              <div className='guest-select-container-small'>
                <GuestSelect
                  guests={orderParams.guests}
                  onSetField={onSetField}
                />
              </div>
            )}
          </div>
        </section>
        <div>
          <div className='reserve-btns-ref' ref={el => { reserveBtnRef.current = el; setRefVisible(!!el) }}></div>
          {orderParams.checkIn && orderParams.checkOut && (
            <BtnSquareColor onClick={handleReserveClick} children={'Reserve'} />
          )}
          {(!orderParams.checkIn || !orderParams.checkOut) && (
            <BtnSquareColor
              onClick={() => {
                setOpenTab('checkIn')
              }}
              children={'Reserve'}
            />
          )}
          <section className='order-details flex'>
            {orderParams.checkIn && orderParams.checkOut && (
              <OrderDetails
                checkIn={orderParams.checkIn}
                checkOut={orderParams.checkOut}
                stay={stay}
              />
            )}
          </section>
        </div>
      </div>
    </section>
  )
}