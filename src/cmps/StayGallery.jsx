import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import heart from '../assets/img/various/heart.svg'
import share from '../assets/img/various/share.svg'

// import { stayService } from '../services/stay/stay.service.local'
// import StayTitle from './LocationMap'
// import ImageGallery from './ImageGallery'
// import StayInfo from './StayInfo'
// import StayFeatures from './StayFeatures'
// import Reviews from './Reviews'
// import BookingForm from './BookingForm'
// import LocationMap from './LocationMap'

export function StayGallery() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)

  useEffect(() => {
    async function fetchStay() {
      const fetchedStay = await stayService.getById(stayId)
      setStay(fetchedStay)
    }
    fetchStay()
  }, [stayId])

  if (!stay) return <div>Loading...</div>
  const displayedImages = stay.imgUrls.slice(1)

  return (
    <div className='stay-header-container'>
      <div className='stay-header'>
        <h1 className='stay-title'> {stay.name}</h1>
        <div className='action-buttons'>
          <div className='action-icon'>
            <img src={share} alt='Share' className='share-icon' />
            <button className='share-button'>Share</button>
          </div>
          <div className='action-icon'>
            <img src={heart} alt='Heart' className='save-icon' />
            <button className='save-button'>Save</button>
          </div>
        </div>
      </div>
      <div className='image-container'>
        <img src={stay.imgUrls[0]} alt={'Image 1'} className='main-img' />
        <div className='more-images'>
          {displayedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 2}`}
              className={`secondary-img`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
