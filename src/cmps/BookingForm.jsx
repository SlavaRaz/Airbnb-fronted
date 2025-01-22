import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { DateSelect } from '../cmps/Date-select.jsx';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GuestSelect } from './Guest-select.jsx';

export function BookingForm({stay,openTab,setOpenTab}) {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [formState, setFormState] = useState(
        {
        location: searchParams.get('location') || '',
        checkIn: +searchParams.get('checkIn') ? new Date(+searchParams.get('checkIn')) : '',
        checkOut: +searchParams.get('checkOut') ? new Date(+searchParams.get('checkIn')) : '',
        guests: {
            adults: +searchParams.get('adults') || 1,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0,
        },
    })

    const handleFieldChange = (field, value) => {

        const params = new URLSearchParams(searchParams)
        if (field === 'guests') {
          Object.entries(value).forEach(([key, val]) => params.set(key, val));
        } else if (field === 'checkIn' || field === 'checkOut') {
          params.set(field, value ? value.getTime() : '')
        }
        setSearchParams(params)
      }

      const handleReserveClick = () => {

        const paramsToSet = utilService.objectToSearchParams({
          checkIn: formState.checkIn.getTime(),
          checkOut: formState.checkOut.getTime(),
          ...formState.guests,
        })
        navigate(`/book/stay/${stay._id}?${paramsToSet}`)
      }

      const checkInSubHeading = formState.checkIn
      ? `${utilService.formattedDate(+formState.checkIn)}`
      : 'Add Date'
    const checkOutSubHeading = formState.checkOut
      ? `${utilService.formattedDate(+formState.checkOut)}`
      : 'Add Date'


      function getGuestsSubHeading() {
        var guestSubheading = ''
        const { adults, children, infants, pets } = formState.guests
        if (adults) guestSubheading += `${adults} adults`
        if (children) guestSubheading += `, ${children} children`
        if (infants) guestSubheading += `, ${infants} infants`
        if (pets) guestSubheading += `, ${pets} pets`
        if (guestSubheading.includes('1 adults' || '1 children' || '1 infants' || '1 pets')) {
          guestSubheading = guestSubheading.replace('1 adults', '1 adult')
          guestSubheading = guestSubheading.replace('1 children', '1 child')
          guestSubheading = guestSubheading.replace('1 infants', '1 infant')
          guestSubheading = guestSubheading.replace('1 pets', '1 pet')
        }
        if (!guestSubheading) guestSubheading = 'Add Guests'
        if (guestSubheading === '1 adult') guestSubheading = '1 guest'
        return guestSubheading
      }


    return (
        <section className='booking-modal'>
        <div className='booking-modal-form flex'>
          {/* HEADER - Price + Reviews */}
          <header className='booking-form-header flex'>
            <h4>
              <span className="order-price">${(Math.round(stay.price)).toLocaleString()}</span>
              <span className="order-night" style={{ fontFamily: 'cereal-Book' }}> night</span>
            </h4>
            {/* <div className='order-rating-review flex'>
              <RatingReview reviews={stay.reviews} />
              <span>•</span>
              <div
                className='stay-rating'
                onClick={() => openTab('reviews-modal')}>
                {stay.reviews.length} reviews
              </div>
            </div> */}
          </header>
  
          {/* Reservation Edit */}
          <section className='picker-container'>
            
            {/* Dates: checkIn/checkOut */}
            {(openTab === 'checkIn' || openTab === 'checkOut') && (

              <section className='date-picker-modal'>
                <div className='date-picker-header'>
                {(formState.checkIn && formState.checkOut) ? (<h4>{utilService.totalDays(formState.checkIn, formState.checkOut)} nights</h4>) : <h4>Select Dates</h4>}
                {(formState.checkIn && formState.checkOut) ? ( <h5>{utilService.ShortFormattedDate(formState.checkIn)}-{utilService.ShortFormattedDate(formState.checkOut)}</h5>) : <h5>Minimum nights: 2 days</h5>}
                </div>
  
                <DateSelect
                  checkIn={formState.checkIn}
                  checkOut={formState.checkOut}
                  handleFieldChange={handleFieldChange}
                  className='date-picker'
                />
                <div className="date-picker-modal-btns">
                  <button className="reset-dates-btn clean-button" onClick={() => { handleFieldChange('checkIn', ''); handleFieldChange('checkOut', '') }}>Clear dates</button>
                  {/* <div className='close-dates-btn'>
                    <BtnSquareBlack onClick={() => setOpenTab('')}>Close</BtnSquareBlack>
                  </div> */}
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
  
            {/* Guests */}
            <div className='guest-picker'>
              <button className='clean-button guest-btn' onClick={() => (openTab === 'guests' ? setOpenTab(null) : setOpenTab('guests'))}>
                <div className='order-heading'>Guests</div>
                <div className='order-sub-heading'>{getGuestsSubHeading()}</div>
                <div className="drawer-arrow-icon">{(openTab === 'guests' ? <IoIosArrowUp /> : <IoIosArrowDown />)}</div>
              </button>
              {openTab === 'guests' && (
                <div className='guest-select-container-small'>
                  <GuestSelect
                    guests={formState.guests}
                    handleFieldChange={handleFieldChange}
                  />
                </div>
              )}
            </div>
          </section>
  
          {/* Reserve/CheckAvailability Button
          <div>
            <div className='reserve-btns-ref' ref={el => { reserveBtnRef.current = el; setRefVisible(!!el) }}></div>
            {formState.checkIn && formState.checkOut && (
              <BtnSquareColor onClick={onClickReserve} children={'Reserve'} />
            )}
            {(!formState.checkIn || !formState.checkOut) && (
              <BtnSquareColor
                onClick={() => {
                  setOpenTab('checkIn')
                }}
                children={'Check Availability'}
              />
            )}
  
            <section className='order-details flex'>
              {formState.checkIn && formState.checkOut && (
                <OrderDetails
                  checkIn={formState.checkIn}
                  checkOut={formState.checkOut}
                  stay={stay}
                />
              )}
  
            </section>
          </div> */}
        </div>
      </section>
    )
}