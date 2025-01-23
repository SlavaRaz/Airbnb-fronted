
import { useParams } from 'react-router-dom'
import { BookingForm } from './BookingForm'
import { useEffect, useRef, useState } from 'react'
import useOnScreen from '../customHooks/useOnScreen'
import { stayService } from '../services/stay/stay.service.local'



export function StayDescription() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)
  const [openTab, setOpenTab] = useState(false)
  const reserveBtnRef = useRef()
  const reserveBtnVisible = useOnScreen(reserveBtnRef, '-34px')

  useEffect(() => {
    async function fetchStay() {
      const fetchedStay = await stayService.getById(stayId)
      setStay(fetchedStay)
    }
    fetchStay()
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    <article>
      <div className='details-and-reserve '>
        <div className='details'>
          <div className='type-and-capacity'><div className='type-title'>{`${stay.roomType} in ${stay.loc.city}, ${stay.loc.country}`}</div>
            <div className='capacity-details'>{`${stay.capacity} guests · ${stay.bedrooms} bedrooms · ${stay.bathrooms} baths`}</div>
          </div><div className='host flex'>
            <img
              src={stay.host.thumbnailUrl}
              alt='host'
              width='10'
              height='10'
            />
            <div className='host-info'>
              <h4>{`Hosted by ${stay.host.fullname}`}</h4>
              <div>'Superhost'</div>
            </div>
          </div>
        </div>
        <div className='reserve-stay-form'>
          <BookingForm
            stay={stay}
            openTab={openTab}
            setOpenTab={setOpenTab}
            reserveBtnRef={reserveBtnRef} />
        </div>
      </div>
    </article>
  )
}
