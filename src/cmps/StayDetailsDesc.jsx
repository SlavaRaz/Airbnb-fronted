import { useParams } from 'react-router-dom'
import { BookingForm } from './BookingForm'
import { Amenities } from './amenities'
import { useEffect, useRef, useState } from 'react'
import useOnScreen from '../customHooks/useOnScreen'
import { stayService } from '../services/stay/'
import cancelationIcon from '../assets/img/highlights/calendar.svg'
import locationIcon from '../assets/img/highlights/location.svg'
import checkInIcon from '../assets/img/highlights/check in.svg'



export function StayDescription({ stay }) {
  const [openTab, setOpenTab] = useState(false)
  const reserveBtnRef = useRef()
  // const reserveBtnVisible = useOnScreen(reserveBtnRef, '-34px')

  return (
    <article>
      <div className='details-and-reserve main container full'>
        <div className='details'>
          <div className='type-and-capacity'>
            <div className='type-title'>{`${stay.roomType} in ${stay.loc.city}, ${stay.loc.country}`}</div>
            <div className='capacity-details'>{`${stay.capacity} guests · ${stay.bedrooms} bedrooms · ${stay.bathrooms} baths`}</div>
          </div>
          <div className='host flex'><div className='host-info'>
            <img
              src={stay.host.pictureUrl}
              alt='host'
              width='10'
              height='10'
            />
            <div className='host-text'>
              <h4>{`Hosted by ${stay.host.fullname}`}</h4>
              <div className='hosting-length'>9 years hosting</div></div>
            </div>
          </div>

          <div className='divider'></div>
          <section className='advantages-list flex'>
            <div className='advantage flex'>
              <div className='advantage-icon'>
                <img className='location-icon' src={locationIcon} alt={'location-icon'} />{' '}
              </div>
              <div className='advantage-text flex'>
                <span className='advantage-title'>Great location</span>
                <span className='advantage-details'>
                  This home is highly ranked based on location
                </span>
              </div>
            </div>
            <div className='advantage flex'>
              <div className='advantage-icon'>
                <img className='check-in-icon' src={checkInIcon} alt={'check-in-icon'} />{' '}
              </div>
              <div className='advantage-text flex'>
                <span className='advantage-title'>Self check-in</span>
                <span className='advantage-details'>
                  Check yourself in with the lockbox
                </span>
              </div>
            </div>
            <div className='advantage flex'>
              <div className='advantage-icon'>
                <img className='cancelation-icon' src={cancelationIcon} alt={'cancelation-icon'} />{' '}
              </div>
              <div className='advantage-text flex'>
                <span className='advantage-title'>
                  Free cancellation for 48 hours
                </span>
                <span className='advantage-details'>
                  Get a full refund if you change your mind
                </span>
              </div>
            </div>
          </section>
          <div className='divider'></div>

          <div className='stay-description'>{stay.summary}</div>
          <div className='divider'></div>

          <Amenities stay={stay} />
        </div>

        <div className='reserve-stay-form'>
    

          <BookingForm
            stay={stay}
            openTab={openTab}
            setOpenTab={setOpenTab}
            reserveBtnRef={reserveBtnRef}
          />
        </div>
        <div className='divider-amenities'></div>

      </div>
      <div className='divider'></div>

    </article>
  )
} 