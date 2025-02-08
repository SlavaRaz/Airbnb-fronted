import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // Import carousel styles
import { Link } from 'react-router-dom'
import heart from '../assets/img/various/heart.svg'
import share from '../assets/img/various/share.svg'
import arrowLeftImg from '../assets/img/various/arrow-left.svg'


export function StayGallery({ stay }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 743)
  const navigate = useNavigate()


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 743)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function onGoBack() {
    navigate(-1)
}

  return (
    <div className='stay-header-container'>
      <div className='stay-header'>
      
        <h1 className='stay-title'>{stay.name}</h1>
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

      {/* Show Carousel on Mobile and Grid on Desktop */}
      {isMobile ? (
        <div className="carousel-wrapper">
        <div className="icon-svg custom-arrow left-arrow" onClick={onGoBack}>
        <img src={arrowLeftImg} className="arrow-img-mobile" alt="Back" />
      </div>

        <Carousel
          showThumbs={false}
          showStatus={true}
          showIndicators={false}
          infiniteLoop={false}
          autoPlay={false}
          swipeable={true}
          emulateTouch={true}
          interval={4000}
          stopOnHover={true}
        >
          {stay.imgUrls.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Carousel>
        </div>
      ) : (
        <div className='image-container'>
          {stay.imgUrls.slice(0, 5).map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} className="img-details" />
          ))}
        </div>
      )}
    </div>
  )
}
