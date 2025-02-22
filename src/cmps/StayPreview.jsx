import { Carousel } from 'react-responsive-carousel'
import StarIcon from '../assets/img/various/star.svg'
import arrowLeft from '../assets/img/various/left-arrow.svg'
import arrowRight from '../assets/img/various/right-arrow.svg'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { utilService } from '../services/util.service'


export function StayPreview({ stay, filters }) {

  const currLocation = useLocation()
  const searchStr = utilService.setDefaultParams(currLocation.search)

  const renderArrowPrev = (onClickHandler, hasPrev) => {
    return hasPrev ? (
      <button
        type='button'
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onClickHandler(event)
        }}
        className='custom-arrow prev-arrow'
      >
        <img src={arrowLeft} alt='Previous' />
      </button>
    ) : null
  }

  const renderArrowNext = (onClickHandler, hasNext) => {
    return hasNext ? (
      <button
        type='button'
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onClickHandler(event)
        }}
        className='custom-arrow next-arrow'
      >
        <img src={arrowRight} alt='Next' />
      </button>
    ) : null
  }

  let display = 'block'

  if (filters && stay.type !== filters) {
    display = 'none'
  }
  // console.log('xxxxxxxx'+stay._id)
  return (
    <article
      style={{ display: display }}
      key={stay._id}
      className='stay-preview'
    >

      <Link to={`/stay/${stay._id}${searchStr}`} key={stay._id} className='stay-link'>
        <Carousel
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
          showIndicators={true}
          showArrows={true}
          showThumbs={false}
          infiniteLoop={false}
          dynamicHeight={false}
          emulateTouch={true}
          showStatus={false}
          className='stay-carousel'
        >
          {stay.imgUrls.map((imgUrl, idx) => (
            <div key={idx} className='image-container'>
              <img
                src={imgUrl}
                alt={`Image ${idx + 1}`}
                className='preview-img'
              />
            </div>
          ))}
        </Carousel>
        <div className='stay-card-details'>
          <div className='preview-header'>
            <div className='preview-name'>{`${stay.loc.city}, ${stay.loc.country}`}</div>
            <div className='preview-rating'>
              <img src={StarIcon} alt='star' width='12' height='12' />{' '}
              <span className='stay-rate'>{stay.rate}</span>
            </div>
          </div>
          <p className='preview-summary'>{stay.summary}</p>
          <p className='preview-dates'>{stay.availableDates}</p>
          <div className='preview-price'>
            <span className='price-number'>{stay.price}$</span>
            <span> night</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
